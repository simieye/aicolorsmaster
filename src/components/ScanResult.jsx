// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle, Copy, Share2, ExternalLink, Clock, Tag } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export function ScanResult({
  result,
  onClose,
  selectedLanguage
}) {
  const getText = key => {
    const texts = {
      'zh-CN': {
        scanResult: '扫码结果',
        scanType: '码类型',
        scanTime: '扫码时间',
        scanContent: '扫码内容',
        copy: '复制',
        share: '分享',
        openLink: '打开链接',
        close: '关闭',
        copySuccess: '复制成功',
        shareSuccess: '分享成功'
      },
      'en-US': {
        scanResult: 'Scan Result',
        scanType: 'Code Type',
        scanTime: 'Scan Time',
        scanContent: 'Scan Content',
        copy: 'Copy',
        share: 'Share',
        openLink: 'Open Link',
        close: 'Close',
        copySuccess: 'Copied Successfully',
        shareSuccess: 'Shared Successfully'
      },
      'ja-JP': {
        scanResult: 'スキャン結果',
        scanType: 'コードタイプ',
        scanTime: 'スキャン時間',
        scanContent: 'スキャン内容',
        copy: 'コピー',
        share: '共有',
        openLink: 'リンクを開く',
        close: '閉じる',
        copySuccess: 'コピー成功',
        shareSuccess: '共有成功'
      },
      'ko-KR': {
        scanResult: '스캔 결과',
        scanType: '코드 유형',
        scanTime: '스캔 시간',
        scanContent: '스캔 내용',
        copy: '복사',
        share: '공유',
        openLink: '링크 열기',
        close: '닫기',
        copySuccess: '복사 성공',
        shareSuccess: '공유 성공'
      }
    };
    return texts[selectedLanguage]?.[key] || texts['zh-CN'][key];
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content);
      // Toast提示复制成功
      alert(getText('copySuccess'));
    } catch (err) {
      console.error('复制失败:', err);
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: getText('scanResult'),
          text: result.content
        });
        alert(getText('shareSuccess'));
      } else {
        // 降级处理
        await handleCopy();
      }
    } catch (err) {
      console.error('分享失败:', err);
    }
  };
  const handleOpenLink = () => {
    if (result.content.startsWith('http://') || result.content.startsWith('https://')) {
      window.open(result.content, '_blank');
    }
  };
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleString();
  };
  const getTypeLabel = type => {
    const types = {
      'qr': 'QR Code',
      'barcode': 'Barcode',
      'datamatrix': 'Data Matrix'
    };
    return types[type] || type;
  };
  return <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            {getText('scanResult')}
          </h3>
          <Button onClick={onClose} className="text-gray-500 hover:text-gray-700" variant="ghost">
            ×
          </Button>
        </div>

        {/* 结果内容 */}
        <div className="space-y-4">
          {/* 码类型 */}
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="w-4 h-4 mr-2" />
            <span className="font-medium">{getText('scanType')}:</span>
            <span className="ml-2">{getTypeLabel(result.type)}</span>
          </div>

          {/* 扫码时间 */}
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">{getText('scanTime')}:</span>
            <span className="ml-2">{formatTime(result.timestamp)}</span>
          </div>

          {/* 扫码内容 */}
          <div>
            <h4 className="font-medium text-gray-700 mb-2">{getText('scanContent')}:</h4>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-800 break-all">{result.content}</p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleCopy} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              <Copy className="w-4 h-4 mr-2" />
              {getText('copy')}
            </Button>
            
            <Button onClick={handleShare} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              {getText('share')}
            </Button>
            
            {(result.content.startsWith('http://') || result.content.startsWith('https://')) && <Button onClick={handleOpenLink} className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                {getText('openLink')}
              </Button>}
          </div>
        </div>
      </div>
    </div>;
}
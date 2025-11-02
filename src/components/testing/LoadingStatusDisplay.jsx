// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge, Alert, AlertDescription } from '@/components/ui';
// @ts-ignore;
import { Loader2, CheckCircle, XCircle, AlertTriangle, Clock, Database } from 'lucide-react';

// @ts-ignore;
import { InlineLoading } from '@/components/LoadingStates';
export function LoadingStatusDisplay({
  batchLoader,
  isRunning,
  currentTest
}) {
  const getStatusIcon = status => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };
  const getStatusBadge = loader => {
    if (loader.loading) return <Badge variant="secondary">加载中</Badge>;
    if (loader.error) return <Badge variant="destructive">错误</Badge>;
    if (loader.data) return <Badge variant="default">完成</Badge>;
    return <Badge variant="outline">未开始</Badge>;
  };
  const calculateProgress = () => {
    const loaders = Object.values(batchLoader).filter(loader => loader && typeof loader === 'object');
    if (loaders.length === 0) return 0;
    const completed = loaders.filter(loader => !loader.loading && (loader.data || loader.error)).length;
    return completed / loaders.length * 100;
  };
  return <div className="space-y-4">
      {/* 总体进度 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            总体加载状态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">进度</span>
              <span className="text-sm text-muted-foreground">
                {calculateProgress().toFixed(0)}%
              </span>
            </div>
            <Progress value={calculateProgress()} className="w-full" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {Object.values(batchLoader).filter(loader => loader?.loading).length}
                </div>
                <div className="text-xs text-muted-foreground">加载中</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {Object.values(batchLoader).filter(loader => loader?.data && !loader?.error).length}
                </div>
                <div className="text-xs text-muted-foreground">成功</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {Object.values(batchLoader).filter(loader => loader?.error).length}
                </div>
                <div className="text-xs text-muted-foreground">失败</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-500">
                  {Object.values(batchLoader).filter(loader => loader?.isFromCache).length}
                </div>
                <div className="text-xs text-muted-foreground">缓存命中</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 详细状态 */}
      <Card>
        <CardHeader>
          <CardTitle>详细加载状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(batchLoader).map(([key, loader]) => {
            if (!loader || typeof loader !== 'object') return null;
            return <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(loader.loading ? 'loading' : loader.error ? 'error' : 'success')}
                  <div>
                    <div className="font-medium text-sm">{key}</div>
                    <div className="text-xs text-muted-foreground">
                      {loader.type} • {loader.key}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusBadge(loader)}
                  {loader.loading && <InlineLoading text="加载中..." />}
                  {loader.isFromCache && <Badge variant="outline">缓存</Badge>}
                  {loader.retryAttempts > 0 && <Badge variant="secondary">
                      重试 {loader.retryAttempts}
                    </Badge>}
                </div>
              </div>;
          })}
          </div>
        </CardContent>
      </Card>

      {/* 错误信息 */}
      {batchLoader.hasErrors && <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <XCircle className="w-5 h-5" />
              错误信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(batchLoader.errors).map(([key, error]) => <Alert key={key}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-medium">{key}</div>
                    <div className="text-sm">{error?.message || '未知错误'}</div>
                  </AlertDescription>
                </Alert>)}
            </div>
          </CardContent>
        </Card>}
    </div>;
}
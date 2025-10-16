// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, useToast } from '@/components/ui';
// @ts-ignore;
import { Users, TrendingUp, DollarSign, Link, QrCode, BarChart3, Team, Award, Calendar, Download, Share2, Copy, Eye, Target, Zap, Shield } from 'lucide-react';

// @ts-ignore;
import { useI18n } from '@/lib/i18n';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
export default function AffiliateMarketing(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const {
    t
  } = useI18n();

  // 状态管理
  const [activeTab, setActiveTab] = useState('dashboard');
  const [affiliateData, setAffiliateData] = useState(null);
  const [commissionData, setCommissionData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [promotionLinks, setPromotionLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    // 模拟分销商数据
    setAffiliateData({
      level: '黄金分销商',
      totalEarnings: 45680.50,
      currentMonthEarnings: 3250.80,
      totalOrders: 156,
      conversionRate: 12.5,
      teamSize: 23,
      joinDate: '2023-06-15',
      nextLevelTarget: 50000,
      currentProgress: 45680.50
    });

    // 模拟佣金数据
    setCommissionData([{
      id: 1,
      date: '2024-01-15',
      type: '直接佣金',
      amount: 125.50,
      orderId: 'ORD-2024-001',
      customerName: '张小姐',
      product: '微潮紫染发套餐',
      status: '已结算',
      level: 1
    }, {
      id: 2,
      date: '2024-01-14',
      type: '团队佣金',
      amount: 85.20,
      orderId: 'ORD-2024-002',
      customerName: '李女士',
      product: '樱花粉染发套餐',
      status: '已结算',
      level: 2
    }, {
      id: 3,
      date: '2024-01-13',
      type: '直接佣金',
      amount: 156.80,
      orderId: 'ORD-2024-003',
      customerName: '王先生',
      product: '奶茶棕染发套餐',
      status: '待结算',
      level: 1
    }]);

    // 模拟团队数据
    setTeamData([{
      id: 1,
      name: '陈美美',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      level: '白银分销商',
      joinDate: '2023-08-20',
      totalOrders: 45,
      totalEarnings: 8950.20,
      thisMonthOrders: 12,
      thisMonthEarnings: 1250.50,
      status: '活跃'
    }, {
      id: 2,
      name: '刘晓明',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      level: '青铜分销商',
      joinDate: '2023-09-15',
      totalOrders: 28,
      totalEarnings: 4560.80,
      thisMonthOrders: 8,
      thisMonthEarnings: 680.20,
      status: '活跃'
    }]);

    // 模拟推广链接数据
    setPromotionLinks([{
      id: 1,
      name: '春季染发推广',
      url: 'https://aihair.com/spring-promo?aff=12345',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aihair.com/spring-promo?aff=12345',
      clicks: 1256,
      conversions: 158,
      conversionRate: 12.6,
      earnings: 2340.50,
      createdDate: '2024-01-01',
      status: '活跃'
    }, {
      id: 2,
      name: '新用户专享',
      url: 'https://aihair.com/new-user?aff=12345',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://aihair.com/new-user?aff=12345',
      clicks: 856,
      conversions: 95,
      conversionRate: 11.1,
      earnings: 1560.80,
      createdDate: '2023-12-15',
      status: '活跃'
    }]);
  }, []);

  // 处理复制链接
  const handleCopyLink = url => {
    navigator.clipboard.writeText(url);
    toast({
      title: "复制成功",
      description: "推广链接已复制到剪贴板"
    });
  };

  // 处理下载二维码
  const handleDownloadQR = (qrCode, name) => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `${name}-二维码.png`;
    link.click();
    toast({
      title: "下载成功",
      description: "二维码已开始下载"
    });
  };

  // 处理提现申请
  const handleWithdrawal = () => {
    toast({
      title: "提现申请已提交",
      description: "我们将在1-3个工作日内处理您的提现申请"
    });
  };

  // 渲染仪表板
  const renderDashboard = () => {
    if (!affiliateData) return null;
    return <div className="space-y-6">
        {/* 数据概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">总收益</p>
                  <p className="text-2xl font-bold text-gray-800">¥{affiliateData.totalEarnings.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+15.3% 本月</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">本月收益</p>
                  <p className="text-2xl font-bold text-gray-800">¥{affiliateData.currentMonthEarnings.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">+8.2% 环比</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">团队规模</p>
                  <p className="text-2xl font-bold text-gray-800">{affiliateData.teamSize}</p>
                  <p className="text-xs text-purple-600">+3 本月新增</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">转化率</p>
                  <p className="text-2xl font-bold text-gray-800">{affiliateData.conversionRate}%</p>
                  <p className="text-xs text-orange-600">+2.1% 优化</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 等级进度 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              等级进度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{affiliateData.level}</h3>
                  <p className="text-sm text-gray-600">距离下一等级还需 ¥{(affiliateData.nextLevelTarget - affiliateData.currentProgress).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">当前进度</p>
                  <p className="text-lg font-bold text-purple-600">{(affiliateData.currentProgress / affiliateData.nextLevelTarget * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{
                width: `${affiliateData.currentProgress / affiliateData.nextLevelTarget * 100}%`
              }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷操作 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Link className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">生成推广链接</h3>
              <p className="text-sm text-gray-600">创建专属推广链接和二维码</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">佣金提现</h3>
              <p className="text-sm text-gray-600">申请佣金提现到账</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">数据分析</h3>
              <p className="text-sm text-gray-600">查看详细推广数据</p>
            </CardContent>
          </Card>
        </div>
      </div>;
  };

  // 渲染佣金管理
  const renderCommission = () => {
    return <div className="space-y-6">
        {/* 佣金统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">待结算佣金</p>
                <p className="text-3xl font-bold text-orange-600">¥2,580.50</p>
                <p className="text-xs text-gray-500 mt-1">预计3个工作日内到账</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">已结算佣金</p>
                <p className="text-3xl font-bold text-green-600">¥43,100.00</p>
                <p className="text-xs text-gray-500 mt-1">累计已到账金额</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">本月佣金</p>
                <p className="text-3xl font-bold text-blue-600">¥3,250.80</p>
                <p className="text-xs text-gray-500 mt-1">本月累计收益</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 提现操作 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                佣金提现
              </CardTitle>
              <Button onClick={handleWithdrawal} className="bg-green-600 hover:bg-green-700">
                申请提现
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">提现规则</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 最低提现金额：¥100</li>
                  <li>• 提现手续费：2%</li>
                  <li>• 到账时间：1-3个工作日</li>
                  <li>• 支持提现到支付宝、微信、银行卡</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">提现记录</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">¥1,500.00</p>
                      <p className="text-xs text-gray-600">2024-01-10 申请</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已到账</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">¥2,300.00</p>
                      <p className="text-xs text-gray-600">2024-01-05 申请</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">处理中</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 佣金明细 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              佣金明细
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">日期</th>
                    <th className="text-left py-3 px-4">类型</th>
                    <th className="text-left py-3 px-4">订单</th>
                    <th className="text-left py-3 px-4">客户</th>
                    <th className="text-left py-3 px-4">产品</th>
                    <th className="text-right py-3 px-4">金额</th>
                    <th className="text-center py-3 px-4">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionData.map(commission => <tr key={commission.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{commission.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${commission.type === '直接佣金' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {commission.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">{commission.orderId}</td>
                      <td className="py-3 px-4">{commission.customerName}</td>
                      <td className="py-3 px-4">{commission.product}</td>
                      <td className="py-3 px-4 text-right font-medium">¥{commission.amount}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${commission.status === '已结算' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {commission.status}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染推广工具
  const renderPromotion = () => {
    return <div className="space-y-6">
        {/* 推广统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总点击量</p>
                <p className="text-2xl font-bold text-blue-600">2,112</p>
                <p className="text-xs text-green-600">+18.5% 本周</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">总转化数</p>
                <p className="text-2xl font-bold text-green-600">253</p>
                <p className="text-xs text-green-600">+12.3% 本周</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">平均转化率</p>
                <p className="text-2xl font-bold text-purple-600">11.98%</p>
                <p className="text-xs text-red-600">-0.5% 本周</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">推广收益</p>
                <p className="text-2xl font-bold text-orange-600">¥3,901.30</p>
                <p className="text-xs text-green-600">+22.1% 本周</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 创建推广链接 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Link className="w-5 h-5 mr-2" />
              创建推广链接
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">推广活动</h4>
                <div className="space-y-3">
                  <button className="w-full p-4 border-2 border-purple-500 bg-purple-50 rounded-lg text-left">
                    <h5 className="font-medium text-purple-800">春季染发节</h5>
                    <p className="text-sm text-purple-600">佣金比例：15% | 活动时间：3月1日-31日</p>
                  </button>
                  <button className="w-full p-4 border-2 border-gray-300 rounded-lg text-left hover:border-purple-500 hover:bg-purple-50">
                    <h5 className="font-medium">新用户专享</h5>
                    <p className="text-sm text-gray-600">佣金比例：20% | 长期有效</p>
                  </button>
                  <button className="w-full p-4 border-2 border-gray-300 rounded-lg text-left hover:border-purple-500 hover:bg-purple-50">
                    <h5 className="font-medium">会员推荐</h5>
                    <p className="text-sm text-gray-600">佣金比例：10% | 长期有效</p>
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">营销素材</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                    <div className="w-full h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded mb-2"></div>
                    <p className="text-xs text-center">春季海报</p>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                    <div className="w-full h-20 bg-gradient-to-r from-blue-400 to-green-400 rounded mb-2"></div>
                    <p className="text-xs text-center">新用户海报</p>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                    <div className="w-full h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded mb-2"></div>
                    <p className="text-xs text-center">会员海报</p>
                  </div>
                  <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                    <div className="w-full h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded mb-2"></div>
                    <p className="text-xs text-center">产品介绍</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 推广链接管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              推广链接管理
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {promotionLinks.map(link => <div key={link.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{link.name}</h4>
                      <p className="text-sm text-gray-600">创建时间：{link.createdDate}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${link.status === '活跃' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {link.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">推广链接</p>
                      <div className="flex items-center space-x-2">
                        <input type="text" value={link.url} readOnly className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50" />
                        <button onClick={() => handleCopyLink(link.url)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">二维码</p>
                      <div className="flex items-center space-x-2">
                        <img src={link.qrCode} alt="二维码" className="w-16 h-16 border rounded" />
                        <button onClick={() => handleDownloadQR(link.qrCode, link.name)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{link.clicks}</p>
                      <p className="text-xs text-gray-600">点击量</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{link.conversions}</p>
                      <p className="text-xs text-gray-600">转化数</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{link.conversionRate}%</p>
                      <p className="text-xs text-gray-600">转化率</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">¥{link.earnings}</p>
                      <p className="text-xs text-gray-600">收益</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>;
  };

  // 渲染团队管理
  const renderTeam = () => {
    return <div className="space-y-6">
        {/* 团队统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">团队总人数</p>
                <p className="text-2xl font-bold text-blue-600">{affiliateData?.teamSize || 0}</p>
                <p className="text-xs text-green-600">+3 本月新增</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">活跃成员</p>
                <p className="text-2xl font-bold text-green-600">18</p>
                <p className="text-xs text-gray-600">78.3% 活跃率</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">团队总收益</p>
                <p className="text-2xl font-bold text-purple-600">¥125,680.50</p>
                <p className="text-xs text-green-600">+25.6% 本月</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">团队佣金</p>
                <p className="text-2xl font-bold text-orange-600">¥12,568.05</p>
                <p className="text-xs text-green-600">+18.2% 本月</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 团队成员列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Team className="w-5 h-5 mr-2" />
                团队成员
              </CardTitle>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Users className="w-4 h-4 mr-2" />
                邀请成员
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamData.map(member => <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.level} • 加入时间：{member.joinDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">总订单</p>
                        <p className="font-medium">{member.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">总收益</p>
                        <p className="font-medium">¥{member.totalEarnings}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">本月订单</p>
                        <p className="font-medium">{member.thisMonthOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">本月收益</p>
                        <p className="font-medium">¥{member.thisMonthEarnings}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${member.status === '活跃' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 培训资料 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              培训资料
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:border-purple-500">
                <div className="w-full h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-3"></div>
                <h4 className="font-semibold">分销商入门指南</h4>
                <p className="text-sm text-gray-600">了解分销商基本操作和规则</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">15分钟</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-purple-500">
                <div className="w-full h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded mb-3"></div>
                <h4 className="font-semibold">推广技巧分享</h4>
                <p className="text-sm text-gray-600">学习有效的推广方法和技巧</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">25分钟</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-purple-500">
                <div className="w-full h-24 bg-gradient-to-r from-orange-400 to-red-400 rounded mb-3"></div>
                <h4 className="font-semibold">客户服务技巧</h4>
                <p className="text-sm text-gray-600">提升客户满意度和转化率</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">20分钟</span>
                  <Eye className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  };
  return <div style={style} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">联盟营销分销系统</h1>
          <p className="text-gray-600">Share Agent 智能分销管理，让推广更简单，收益更丰厚</p>
        </div>

        {/* 标签导航 */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {[{
            id: 'dashboard',
            name: '数据概览',
            icon: BarChart3
          }, {
            id: 'commission',
            name: '佣金管理',
            icon: DollarSign
          }, {
            id: 'promotion',
            name: '推广工具',
            icon: Link
          }, {
            id: 'team',
            name: '团队管理',
            icon: Users
          }].map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 rounded-lg transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>;
          })}
          </div>
        </div>

        {/* 内容区域 */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'commission' && renderCommission()}
        {activeTab === 'promotion' && renderPromotion()}
        {activeTab === 'team' && renderTeam()}
      </div>

      {/* 底部导航 */}
      <TabBar currentPage="marketing" onPageChange={pageId => {
      $w.utils.navigateTo({
        pageId: pageId,
        params: {}
      });
    }} />
    </div>;
}
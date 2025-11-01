// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Send, Bot, User, Mic, MicOff, Paperclip, Smile, MoreVertical, Phone, Video, Settings } from 'lucide-react';

// @ts-ignore;
import { TopNavigation } from '@/components/TopNavigation';
// @ts-ignore;
import { TabBar } from '@/components/TabBar';
// @ts-ignore;
import { ErrorBoundary } from '@/components/ErrorBoundary';
// @ts-ignore;
import { LoadingSpinner } from '@/components/LoadingSpinner';
// @ts-ignore;
import { AIChatInterface } from '@/components/AIChatInterface';
// @ts-ignore;

export default function AIChatPage(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('chat');
  const handleNavigation = (pageId, params = {}) => {
    if ($w && $w.utils) {
      $w.utils.navigateTo({
        pageId,
        params
      });
    }
  };
  const handleMessage = ({
    userMessage,
    botReply
  }) => {
    // 可以在这里处理消息记录、分析等
    console.log('用户消息:', userMessage);
    console.log('AI回复:', botReply);
  };
  const tabs = [{
    id: 'chat',
    label: '智能对话',
    icon: <Bot className="w-4 h-4" />
  }, {
    id: 'history',
    label: '对话历史',
    icon: <Settings className="w-4 h-4" />
  }];
  return <ErrorBoundary $w={$w}>
      <div className="min-h-screen bg-background flex flex-col">
        <TopNavigation title="AI智能对话" showBack={true} />
        
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* 标签页 */}
          <div className="bg-card border-b">
            <div className="flex">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center space-x-2 py-3 border-b-2 transition-colors ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>)}
            </div>
          </div>

          {/* 聊天界面 */}
          {activeTab === 'chat' && <div className="flex-1">
              <AIChatInterface onMessage={handleMessage} context={{
            page: 'ai-chat',
            userId: $w?.auth?.currentUser?.userId
          }} placeholder="输入您的问题..." title="AI智能助手" />
            </div>}

          {/* 历史记录 */}
          {activeTab === 'history' && <div className="flex-1 p-4">
              <Card>
                <CardHeader>
                  <CardTitle>对话历史</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>暂无对话历史</p>
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>

        <TabBar />
      </div>
    </ErrorBoundary>;
}
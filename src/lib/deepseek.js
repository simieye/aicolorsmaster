
// DeepSeek API 集成服务
const DEEPSEEK_API_KEY = 'sk-7cd4bdfacd544b2cb8479331caa1f447';
const DEEPSEEK_API_BASE = 'https://api.deepseek.com/v1';

class DeepSeekService {
  constructor() {
    this.apiKey = DEEPSEEK_API_KEY;
    this.baseURL = DEEPSEEK_API_BASE;
    this.cache = new Map();
    this.requestQueue = [];
    this.isProcessing = false;
  }

  // 生成聊天完成
  async chatCompletion(messages, options = {}) {
    const {
      model = 'deepseek-chat',
      temperature = 0.7,
      max_tokens = 2000,
      stream = false,
      ...otherOptions
    } = options;

    // 检查缓存
    const cacheKey = this.generateCacheKey(messages, options);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
          stream,
          ...otherOptions
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      let result;
      if (stream) {
        result = await this.handleStreamResponse(response);
      } else {
        const data = await response.json();
        result = data.choices[0]?.message?.content || '';
      }

      // 缓存结果
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  // 处理流式响应
  async handleStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content;
            if (content) {
              result += content;
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }

    return result;
  }

  // 生成缓存键
  generateCacheKey(messages, options) {
    const key = {
      messages: messages.map(m => ({ role: m.role, content: m.content.slice(0, 100) })),
      temperature: options.temperature,
      model: options.model
    };
    return btoa(JSON.stringify(key));
  }

  // 智能客服回复
  async getCustomerServiceReply(userMessage, context = {}) {
    const systemPrompt = `你是一个专业的AI智能客服助手，专门为染发产品和服务提供支持。请遵循以下原则：
1. 使用友好、专业的语调
2. 提供准确、有用的信息
3. 如果不确定答案，请诚实说明
4. 优先考虑用户的安全和需求
5. 可以推荐相关产品和服务

当前上下文：${JSON.stringify(context)}

用户问题：${userMessage}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    return await this.chatCompletion(messages, {
      temperature: 0.7,
      max_tokens: 1000
    });
  }

  // 产品推荐
  async getProductRecommendations(userProfile, preferences = {}) {
    const systemPrompt = `你是一个专业的染发产品推荐专家。根据用户信息和偏好，推荐最适合的产品。

用户信息：${JSON.stringify(userProfile)}
用户偏好：${JSON.stringify(preferences)}

请推荐3-5个最适合的产品，每个产品包含：
- 产品名称
- 推荐理由
- 适合的发质和肤色
- 使用注意事项

请以JSON格式返回推荐结果。`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '请为我推荐合适的染发产品' }
    ];

    const response = await this.chatCompletion(messages, {
      temperature: 0.8,
      max_tokens: 1500
    });

    try {
      return JSON.parse(response);
    } catch (e) {
      // 如果解析失败，返回文本格式
      return {
        recommendations: [
          {
            name: 'AI智能染发剂',
            reason: response,
            suitable: '所有发质',
            notes: '请按照说明书使用'
          }
        ]
      };
    }
  }

  // 配方生成
  async generateHairDyeFormula(requirements) {
    const systemPrompt = `你是一个专业的染发配方专家。根据用户需求生成安全、有效的染发配方。

用户需求：${JSON.stringify(requirements)}

请生成详细的染发配方，包含：
1. 所需材料和比例
2. 详细制作步骤
3. 使用方法
4. 注意事项
5. 预期效果

请确保配方的安全性和可行性。`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '请为我生成染发配方' }
    ];

    return await this.chatCompletion(messages, {
      temperature: 0.6,
      max_tokens: 2000
    });
  }

  // 颜色识别和分析
  async analyzeColor(imageDescription, userRequirements) {
    const systemPrompt = `你是一个专业的颜色分析专家。根据图像描述和用户需求，提供颜色分析和建议。

图像描述：${imageDescription}
用户需求：${JSON.stringify(userRequirements)}

请提供：
1. 颜色分析
2. 适合的染发方案
3. 配色建议
4. 注意事项`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '请分析这个颜色并提供染发建议' }
    ];

    return await this.chatCompletion(messages, {
      temperature: 0.7,
      max_tokens: 1500
    });
  }

  // 清除缓存
  clearCache() {
    this.cache.clear();
  }

  // 获取缓存状态
  getCacheStatus() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// 创建全局实例
export const deepseekService = new DeepSeekService();

// 导出服务类
export default DeepSeekService;

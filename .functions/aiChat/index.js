
const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

// 模拟AI响应（实际应用中应该调用真实的AI API）
const generateAIResponse = async (message, history, settings) => {
  // 简单的规则基础响应系统
  const responses = {
    '推荐': '根据您的需求，我推荐以下产品：\n1. 美涂士环保内墙漆 - 适合室内使用，无甲醛添加\n2. 立邦防水外墙涂料 - 适合外墙，超强防水性能\n3. 多乐士强力底漆 - 增强附着力，提高面漆效果',
    '色彩': '关于色彩搭配，我建议：\n• 卧室适合使用温暖柔和的色调，如米色、浅蓝色\n• 客厅可以使用明亮的色彩增加活力\n• 厨房建议使用易清洁的浅色系\n• 书房适合使用有助于专注的深色调',
    '配方': '关于涂料配方，我可以提供以下建议：\n• 环保内墙漆基础配方：环保树脂45%、钛白粉20%、填料25%、助剂10%\n• 外墙防水涂料：丙烯酸树脂50%、防水剂15%、颜料20%、填料10%、助剂5%\n• 请注意安全操作，佩戴防护设备',
    '施工': '涂料施工注意事项：\n1. 基层处理：确保墙面平整、干燥、清洁\n2. 底漆施工：先刷底漆增强附着力\n3. 面漆施工：均匀涂刷，避免流挂\n4. 干燥时间：确保每层充分干燥\n5. 环境要求：温度5-35℃，湿度<85%',
    '用量': '涂料用量计算方法：\n• 内墙漆：12-15㎡/L（两遍）\n• 外墙漆：8-10㎡/L（两遍）\n• 底漆：15-18㎡/L（一遍）\n• 计算公式：面积×遍数÷每升涂布率=所需用量（L）\n• 建议购买时增加10%的余量',
    '储存': '涂料储存方法：\n1. 密封保存：确保桶盖密封严实\n2. 环境要求：阴凉干燥，避免阳光直射\n3. 温度范围：5-25℃最佳\n4. 使用期限：开封后6个月内使用完毕\n5. 避免冻结：冬季注意防冻'
  };

  // 检查消息中是否包含关键词
  for (const [keyword, response] of Object.entries(responses)) {
    if (message.includes(keyword)) {
      return {
        response: response,
        suggestions: generateSuggestions(message)
      };
    }
  }

  // 默认响应
  const defaultResponse = `感谢您的提问！我是专业的涂料行业AI助手。\n\n我可以帮助您解决以下问题：\n• 涂料产品推荐和选择\n• 色彩搭配建议\n• 涂料配方指导\n• 施工工艺咨询\n• 用量计算帮助\n• 储存保养建议\n\n请告诉我您的具体需求，我会为您提供专业的解答。`;

  return {
    response: defaultResponse,
    suggestions: generateSuggestions(message)
  };
};

// 生成建议回复
const generateSuggestions = (message) => {
  const suggestions = [
    '推荐适合卧室的环保涂料',
    '如何选择外墙防水涂料？',
    '涂料配色有什么技巧？',
    '涂料施工的注意事项',
    '如何计算涂料用量？',
    '涂料储存的方法'
  ];

  // 随机返回3个建议
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
};

exports.main = async (event, context) => {
  try {
    const { message, history, settings, userId } = event;
    
    if (!message) {
      return {
        success: false,
        message: '消息内容不能为空'
      };
    }

    // 生成AI响应
    const aiResult = await generateAIResponse(message, history || [], settings || {});

    // 保存聊天记录（可选）
    if (userId) {
      try {
        await db.collection('chat_logs').add({
          userId: userId,
          message: message,
          response: aiResult.response,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('保存聊天记录失败:', error);
        // 不影响主要功能
      }
    }

    return {
      success: true,
      data: {
        response: aiResult.response,
        suggestions: aiResult.suggestions
      }
    };

  } catch (error) {
    console.error('AI聊天失败:', error);
    return {
      success: false,
      message: 'AI聊天服务暂时不可用，请稍后重试'
    };
  }
};

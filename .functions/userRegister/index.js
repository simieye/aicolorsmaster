
const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

exports.main = async (event, context) => {
  try {
    const { username, email, password } = event;
    
    if (!username || !email || !password) {
      return {
        success: false,
        message: '用户名、邮箱和密码不能为空'
      };
    }

    // 检查用户名是否已存在
    const existingUser = await db.collection('users')
      .where({
        username: username
      })
      .get();

    if (existingUser.data.length > 0) {
      return {
        success: false,
        message: '用户名已存在'
      };
    }

    // 检查邮箱是否已存在
    const existingEmail = await db.collection('users')
      .where({
        email: email
      })
      .get();

    if (existingEmail.data.length > 0) {
      return {
        success: false,
        message: '邮箱已被注册'
      };
    }

    // 创建新用户
    const newUser = {
      username: username,
      email: email,
      password: password, // 实际应用中应该加密
      role: 'user',
      status: 'active',
      preferences: {
        language: 'zh-CN',
        theme: 'light',
        notifications: true
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await db.collection('users').add(newUser);

    return {
      success: true,
      data: {
        userId: result.id
      }
    };

  } catch (error) {
    console.error('注册失败:', error);
    return {
      success: false,
      message: '注册失败，请稍后重试'
    };
  }
};

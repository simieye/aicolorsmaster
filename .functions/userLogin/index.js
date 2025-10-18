
const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

exports.main = async (event, context) => {
  try {
    const { username, password } = event;
    
    if (!username || !password) {
      return {
        success: false,
        message: '用户名和密码不能为空'
      };
    }

    // 查询用户
    const userResult = await db.collection('users')
      .where({
        username: username
      })
      .get();

    if (userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      };
    }

    const user = userResult.data[0];

    // 简单的密码验证（实际应用中应该使用加密密码）
    if (user.password !== password) {
      return {
        success: false,
        message: '密码错误'
      };
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return {
        success: false,
        message: '账户已被禁用'
      };
    }

    // 生成token（简单示例，实际应用中应该使用JWT）
    const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

    // 移除密码字段
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: token
      }
    };

  } catch (error) {
    console.error('登录失败:', error);
    return {
      success: false,
      message: '登录失败，请稍后重试'
    };
  }
};


const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.getCurrentEnv()
});

const db = app.database();

exports.main = async (event, context) => {
  try {
    const { userId, ...updateData } = event;
    
    if (!userId) {
      return {
        success: false,
        message: '用户ID不能为空'
      };
    }

    // 移除不允许更新的字段
    const { _id, createdAt, password, ...allowedUpdateData } = updateData;

    // 添加更新时间
    allowedUpdateData.updatedAt = new Date().toISOString();

    // 更新用户信息
    const result = await db.collection('users')
      .doc(userId)
      .update(allowedUpdateData);

    return {
      success: true,
      data: allowedUpdateData
    };

  } catch (error) {
    console.error('更新用户失败:', error);
    return {
      success: false,
      message: '更新用户信息失败'
    };
  }
};

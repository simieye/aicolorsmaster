// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { X, Image as ImageIcon, Tag, Hash } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
export const CreatePostModal = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
      category: 'discussion'
    }
  });

  // 标签选项
  const tagOptions = ['色彩搭配', '施工技巧', '产品推荐', '配方分享', '行业资讯', '经验交流', '问题求助', '作品展示'];

  // 分类选项
  const categories = [{
    value: 'discussion',
    label: '讨论'
  }, {
    value: 'showcase',
    label: '展示'
  }, {
    value: 'question',
    label: '问答'
  }, {
    value: 'tutorial',
    label: '教程'
  }, {
    value: 'news',
    label: '资讯'
  }];

  // 切换标签
  const toggleTag = tag => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  // 提交表单
  const handleSubmit = data => {
    onSubmit({
      ...data,
      tags: selectedTags
    });
    form.reset();
    setSelectedTags([]);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            发布新帖子
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* 标题 */}
              <FormField control={form.control} name="title" rules={{
              required: '请输入标题'
            }} render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-white">标题</FormLabel>
                  <FormControl>
                    <input placeholder="请输入帖子标题" {...field} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white/40 focus:outline-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

              {/* 分类 */}
              <FormField control={form.control} name="category" render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-white">分类</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => <SelectItem key={category.value} value={category.value} className="text-gray-800">
                          {category.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />

              {/* 内容 */}
              <FormField control={form.control} name="content" rules={{
              required: '请输入内容'
            }} render={({
              field
            }) => <FormItem>
                  <FormLabel className="text-white">内容</FormLabel>
                  <FormControl>
                    <Textarea placeholder="请输入帖子内容..." {...field} rows={6} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white/40 focus:outline-none resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

              {/* 标签 */}
              <div>
                <FormLabel className="text-white block mb-2">标签</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map(tag => <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag) ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                      #{tag}
                    </button>)}
                </div>
              </div>

              {/* 图片上传 */}
              <div>
                <FormLabel className="text-white block mb-2">图片</FormLabel>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors cursor-pointer">
                  <ImageIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">点击上传图片或拖拽到此处</p>
                  <p className="text-white/40 text-xs mt-1">支持 JPG、PNG 格式，最大 5MB</p>
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1 bg-white text-purple-600 hover:bg-white/90">
                  发布
                </Button>
                <Button type="button" variant="ghost" className="flex-1 text-white hover:bg-white/20" onClick={onClose}>
                  取消
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>;
};
export default CreatePostModal;
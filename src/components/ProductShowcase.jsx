// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';
// @ts-ignore;
import { Robot, Palette, Users, Store, Heart, Cloud, ArrowRight, Star, Zap } from 'lucide-react';

export const ProductShowcase = ({
  products,
  onProductClick
}) => {
  const productIcons = {
    1: Robot,
    2: Palette,
    3: Users,
    4: Store,
    5: Heart,
    6: Cloud
  };
  const productColors = {
    1: 'text-blue-400',
    2: 'text-green-400',
    3: 'text-purple-400',
    4: 'text-orange-400',
    5: 'text-red-400',
    6: 'text-cyan-400'
  };
  const productBgColors = {
    1: 'bg-blue-500',
    2: 'bg-green-500',
    3: 'bg-purple-500',
    4: 'bg-orange-500',
    5: 'bg-red-500',
    6: 'bg-cyan-500'
  };
  return <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          6大AI美发智能系统
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => {
          const Icon = productIcons[product.id];
          const colorClass = productColors[product.id];
          const bgColorClass = productBgColors[product.id];
          return <div key={product.id} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group" onClick={() => onProductClick(product)}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${bgColorClass} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">¥{product.price.toLocaleString()}</div>
                    <div className="flex items-center text-yellow-400 text-sm">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      {product.rating}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 2).map((feature, index) => <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full">
                      {feature}
                    </span>)}
                </div>
                
                <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 group-hover:bg-blue-500/20 group-hover:border-blue-400 transition-colors">
                  了解详情
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>;
        })}
        </div>
      </CardContent>
    </Card>;
};
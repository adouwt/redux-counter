module.exports = {   
  entry: './main.js',  
  output: {  
    filename: 'bundle.js'  
  },  
  module:{  
      loaders:[  
        {   
            test: /\.css$/,  
            exclude: /node_modules/,     //编译除了node_modules文件夹以外的  
            loader: 'style-loader!css-loader' //感叹号连接两个加载器，css-loader解析css文件 style-loader插入样式到html页面中  
        },  
      ]  
  }  
} 
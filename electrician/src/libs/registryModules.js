// 自动注册模块
const modulesFile=require.context('../store/modules',true,/\.js$/)
// console.log(modulesFile.keys())  ["./bandList.js"]
export default  modulesFile.keys().reduce((prev,path)=>{
    // console.log(prev,path)  ./bandList.js"
    // console.log(prev,modulesFile(path).default,path.match(/\.\/(\w+)\.js$/)[1]) //默认es6模块对象
     prev[path.match(/\.\/(\w+)\.js$/)[1]]=modulesFile(path).default
    //  console.log(prev)
     return prev
},{})

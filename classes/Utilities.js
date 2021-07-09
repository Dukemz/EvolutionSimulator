module.exports = {
  randHexCol: () => Math.floor(Math.random()*16777215).toString(16),
  randRGBCol: () => {return {r: Math.random()*255, g: Math.random()*255, b: Math.random()*255}}
  
}
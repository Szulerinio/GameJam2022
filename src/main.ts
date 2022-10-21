import { setupCounter } from './counter'

const canvas = document.querySelector<HTMLDivElement>('#canvas')

const onKeyDown= ()=>{}

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', ()=>{})
document.addEventListener('mousedown', ()=>{})
document.addEventListener('mouseup', ()=>{})
// document.addEventListener('mousemove', ()=>{})



setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import { create } from 'zustand'
interface State{
    color:string,
    fuente:string

    chanceColor:(color:string)=>void
    changeFuente:(fuente:string)=>void
}

const useUIStore = create<State>()((set) => ({
    color:'black',
    fuente:'geist',

    chanceColor:(color:string)=>{
        set({color})
    },
    changeFuente:(fuente:string)=>{
        set({fuente})   
    }
}))
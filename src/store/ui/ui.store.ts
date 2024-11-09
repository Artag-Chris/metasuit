import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ColorSq{
  backgroundColor:string,
  color:string,
  form?: string
}

export type UIState = {

theme: ColorSq

}

export type UIActions = {
turnBlue: (backgroundColor: string) => void
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    set => ({
   theme:{
    backgroundColor:`red`,
    color:`black`
   },

      turnBlue: (backgroundColor: string) => {
        set({
          theme: {
            backgroundColor,
            color: 'white'
          }
        })
      },
      
    }),
    { name: 'ui-store', skipHydration: true }
  )

)
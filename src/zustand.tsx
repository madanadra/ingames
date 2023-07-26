import { create } from "zustand";
import Setting from "./app/setting";

type State = {
  token: string,
  num: number,
  score: number,
  date: number,
  time: number,
  quiz: any,
  answered: boolean,
  menu: string,
  error: boolean,
}

type Setting = {
  bgm: boolean,
  sfx: boolean,
}

type Actions = {
  setToken: (value: string) => void,
  setNum: (value: number) => void,
  setScore: (value: number) => void,
  setDate: (value: number) => void,
  setTime: (value: number) => void,
  setQuiz: (value: object) => void,
  setAnswered: (value: boolean) => void,
  setMenu: (value: string) => void,
  setError: (value: boolean) => void,
  setBgm: (value: boolean) => void,
  setSfx: (value: boolean) => void,
  reset: () => void
}

const initialState: State = {
  token: '',
  num: 0,
  score: 0,
  date: 0,
  time: 10,
  quiz: [],
  answered: false,
  menu: '',
  error: false,
}

const setting: Setting = {
  bgm: false,
  sfx: false,
}

export const useInGames = create<State & Setting & Actions>((set) => ({
  ...initialState,
  ...setting,
  setToken: (value) => set({ token: value }),
  setNum: (value) => set({ num: value }),
  setScore: (value) => set({ score: value }),
  setDate: (value) => set({ date: value }),
  setTime: (value) => set({ time: value }),
  setQuiz: (value) => set({ quiz: value }),
  setAnswered: (value) => set({ answered: value }),
  setMenu: (value) => set({ menu: value }),
  setError: (value) => set({ error: value }),
  setBgm: (value) => set({ bgm: value }),
  setSfx: (value) => set({ sfx: value }),
  reset: () => {set(initialState)},
}))

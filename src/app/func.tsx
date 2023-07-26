import { setCookie } from 'cookies-next';
import axios from "axios"
import { getCookie } from 'cookies-next';

export async function request(url: string) {
    try {
        const res = await axios.get(url)
        return res
    } catch (error) {
        return error
    }
}

export function getShuffle(v: string[]) {
    for (let i = v.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [v[i], v[j]] = [v[j], v[i]]
    }
    return v
}

export function decode(text: string) {
    return Buffer.from(text, 'base64').toString('utf-8')
}

export function soundEffects(name: string) {
    if (name === 'click') {
        return new Audio('./click.wav').play()
    } else if (name === 'start') {
        return new Audio('./start.mp3').play()
    } else if (name === 'success') {
        return new Audio('./success.wav').play()
    } else if (name === 'fail') {
        return new Audio('./fail.wav').play()
    } else if (name === 'countdown') {
        return new Audio('./countdown.wav').play()
    }
}

export function sorting(a: { score: number, correct: number, date: number }, b: { score: number, correct: number, date: number }) {
    if (a.score > b.score) {
        return -1
    } else if (a.score === b.score) {
        if (a.correct > b.correct) {
            return -1
        } else if (a.correct === b.correct) {
            if (a.date > b.date) {
                return -1
            } else if (a.date === b.date) {
                return 0
            } else {
                return 1
            }   
        } else {
            return 1
        }
    } else {
        return 1
    }
}

export function setHighScore(item: any) {
    const highScoreCookie: any = getCookie('ingames-high-score')
    const highScore = highScoreCookie && JSON.parse(highScoreCookie)
    const old = Array.isArray(highScore) && highScore.length ? highScore.filter(old => old.token !== item.token) : []
    const newHighScore = old.concat(item).sort(sorting).slice(0,5)

    setCookie('ingames-high-score', newHighScore, {maxAge: 60 * 60 * 24 * 7})
}

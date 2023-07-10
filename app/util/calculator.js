//id 만들기 위한 랜덤 숫자 로직
export const getRandom=(min,max)=> {
    return Math.floor(Math.random()*(max - min +1)+min)
}
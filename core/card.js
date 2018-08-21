const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const meal = require('./meal.js')
const data = {
  pages: {
    main: [],
    notice: [],
    meal: [],
    link: [],
    calendar: []
  },
  cards: [],
  blocks: []
}

const init = async function () {
  const def = JSON.parse(await readFile('data/card/default.json'))
  data.pages = def.pages
  data.cards = def.cards
  data.blocks = def.blocks
}

const push = {
  block (block) {
    data.blocks.push(block)
    return data.blocks.length - 1
  },
  card (card) {
    data.cards.push(card)
    return data.cards.length - 1
  },
  page (page, cardid) {
    data.pages[page].push(cardid)
  }
}

const make = {
  async notice () {
    const cards = JSON.parse(await readFile('data/card/notice.json'))
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const title = push.block(card.title)
      const content = push.block(card.content)
      push.page('notice', push.card([title, content])) // 공지사항에 추가
      data.cards[0].splice(data.cards[0].length-1, 0, title) // 메인에 추가
    }
  },
  async meal () {
    debug.log(meal.check())
    if (meal.check() == false) {
      await meal.load()
    }
    const today = new Date()
    const nextday = new Date()
    nextday.setTime(today.getTime()+(24*60*60*1000))

    const todayDate = push.block({
      "type": "title",
      "title": `${today.getMonth()+1}월 ${today.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][today.getDay()]}요일`
    })
    const todaybob = meal.todaybob()
    const todayList = [
        push.block({
          "type": "strong",
          "text": "아침"
        }),
        (
          todaybob[0].length?
          push.block({
            "type": "list",
            "list": todaybob[0]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        ),
        push.block({
          "type": "strong",
          "text": "점심"
        }),
        (
          todaybob[1].length?
          push.block({
            "type": "list",
            "list": todaybob[1]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        ),
        push.block({
          "type": "strong",
          "text": "저녁"
        }),
        (
          todaybob[2].length?
          push.block({
            "type": "list",
            "list": todaybob[2]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        )
      ]
    push.page('meal', push.card([todayDate].concat(todayList)))
    const nextDate = push.block({
      "type": "title",
      "title": `${nextday.getMonth()+1}월 ${nextday.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][nextday.getDay()]}요일`
    })
    const nextbob = meal.nextdaybob()
    const nextList = [
        push.block({
          "type": "strong",
          "text": "아침"
        }),
        (
          nextbob[0].length?
          push.block({
            "type": "list",
            "list": nextbob[0]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        ),
        push.block({
          "type": "strong",
          "text": "점심"
        }),
        (
          nextbob[1].length?
          push.block({
            "type": "list",
            "list": nextbob[1]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        ),
        push.block({
          "type": "strong",
          "text": "저녁"
        }),
        (
          nextbob[2].length?
          push.block({
            "type": "list",
            "list": nextbob[2]
          }):
          push.block({
            "type": "plain",
            "text": '급식정보가 없습니다.'
          })
        )
      ]
    push.page('meal', push.card([nextDate].concat(nextList)))
    data.cards[1] = data.cards[1].concat(todayList)
  },
  async link () {
    const cards = JSON.parse(await readFile('data/card/link.json'))
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const title = push.block(card.title)
      const content = push.block(card.content)
      push.page('link', push.card([title, content]))
    }
  },
  async calendar () {
    const cards = JSON.parse(await readFile('data/card/calendar.json'))
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const block = push.block(card)
      push.page('calendar', push.card([block]))
      data.cards[2].push(block)
    }
  }
}

module.exports = {
  data: data,
  async make () {
    debug.log('카드데이터 로드', 'imp')
    await init()
    await Promise.all([make.meal(), make.notice(), make.link(), make.calendar()])
    debug.log('카드데이터 로드 완료', 'imp')
  }
}

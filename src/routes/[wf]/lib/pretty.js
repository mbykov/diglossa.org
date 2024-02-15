//

import _ from 'lodash'

export function prettyFLS(pos, fls) {
    let morphs = ''
    if (pos == 'name') morphs = prettyName(fls)
    else if (pos == 'verb') morphs = prettyVerb(fls)
    return morphs
}

function prettyName(fls) {
    let morphs = fls.map(flex=> {
        return  [flex.gend, flex.number, flex.case].join('.')
    })
    return _.uniq(morphs).sort()
}

function prettyVerb(fls) {
    let morphs = fls.map(flex=> {
        // log('_prettyVerb Flex', flex)
        // let tense
        let str
        // if (flex.part) str =[ [flex.tense, flex.numper].join('.'),  [flex.gend, 'sg.nom'].join('.') ].join(', ')
        if (flex.part) str = [flex.tense,  [flex.gend, flex.number, flex.case].join('.') ].join(', ')
        else if (flex.inf) str = flex.tense
        else str = [flex.tense, flex.numper].join(', ').trim()
        return str
    })
    return _.uniq(morphs).sort()
}




// export function prettyVerb_OLD(fls) {
//     let more = []
//     let morphs = fls.map(flex=> {
//         // console.log('_F', flex)
//         let str
//       // if (flex.part) str =[ [flex.tense, flex.numper].join('.'),  [flex.gend, 'sg.nom'].join('.') ].join(', ')
//         if (flex.part) str = 'part: ' + [[flex.time, flex.voice, flex.mood].join('.'),  [flex.gend, flex.num, flex.case].join('.') ].join(', ') //str = 'participle etc'
//         else if (flex.inf) str = 'inf: ' + [flex.time, flex.voice, 'inf'].join('.')
//         else str = [[flex.time, flex.voice, flex.mood].join('.'),  flex.numper ].join(', ')
//         return str
//     })
//     morphs = _.uniq(morphs).sort()
//     return {morphs, more}
//   }

// export function prettyName_(fls) {
//     let morphs = fls.map(flex=> {
//         let numcase = [flex.num, flex.case].join('.')
//         return  [flex.gend, numcase].join('.')
//     })
//     return _.uniq(morphs).sort()
// }

// export function prettyName_OLD(fls) {
//     let more = fls.filter(flex=> flex.num =='du')
//     let vocs = fls.filter(flex=> flex.case =='voc')
//     more.push(...vocs)
//     let morphs = fls.filter(flex=> flex.num !='du' && flex.case !='voc')

//     morphs = morphs.map(flex=> {
//         let numcase = [flex.num, flex.case].join('.')
//         return  [flex.gend, numcase].join('.')
//     })
//     morphs = _.uniq(morphs).sort()
//     more = more.map(flex=> {
//         let numcase = [flex.num, flex.case].join('.')
//         return  [flex.gend, numcase].join('.')
//     })
//     more = _.uniq(more).sort()
//     if (!morphs.length && more.length) morphs = more, more = []
//     return {morphs, more}
// }

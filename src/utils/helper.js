import { sortBy } from 'lodash'
import Swal from 'sweetalert2'
import { roundInfo } from './constant'

export const roundCheck = (barcode) => {
  const data = roundInfo
  return data.find((item) => item.barcode === barcode)
}

export const checkPlayed = (currentData, team) => {
  return team?.played?.includes(currentData.round)
}

export const checkAnswersValidation = (answers) => {
  return new Set(answers.map((item) => item.answer)).size === answers.length
}

export const secondsToMinutes = (time) => {
  return (
    Math.floor(time / 60).toFixed(0) +
    ':' +
    Math.floor(time % 60)
      .toFixed(0)
      .padStart(2, '0')
  )
}

export const sortedGamesByScore = (today_games) => {
  return sortBy(
    Object.values(today_games).filter((x) => x.total_time != null),
    (x) => x.total_time
  )
}

export const sweetAlert = (message) => {
  Swal.fire({
    text: message,
    width: 300,
    confirmButtonText: 'Oké!',
    confirmButtonColor: '#01689B',
    background: '#F1F1F1',
  })
}

const swalAlert = Swal.mixin({
  customClass: {
    title: 'swal2-warning-alert',
  },
})

const swalSuccess = Swal.mixin({
  customClass: {
    title: 'swal2-success-alert',
  },
})

export const sweetAlertPopup = (message, submitText, titleText, status) => {
  if (status === 'success') {
    swalSuccess.fire({
      title: titleText,
      text: message,
      width: 300,
      confirmButtonText: submitText,
      confirmButtonColor: '#01689B',
      background: '#F1F1F1',
    })
  } else {
    swalAlert.fire({
      title: titleText,
      text: message,
      width: 300,
      confirmButtonText: submitText,
      confirmButtonColor: '#01689B',
      background: '#F1F1F1',
    })
  }
}

export const sweetAlertPopupAlternative = (message) => {
  Swal.fire({
    text: message,
    width: 300,
    confirmButtonText: 'Dan gaan we verder',
    confirmButtonColor: '#01689B',
    background: '#F1F1F1',
  })
}

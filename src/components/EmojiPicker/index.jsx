import React, { useEffect, useState } from 'react'
import { EmojiPickerContainer, PickerModal } from './styles'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useTheme } from '../../hooks/useTheme'


function EmojiPicker(props) {
  const [selectedEmoji, setSelectedEmoji] = useState()
  const [isShowPicker, setIsShowPicker] = useState(false)
  const { currentTheme } = useTheme()

  useEffect(() => {
    setSelectedEmoji(props.icon)
  },[props.icon])

  function selectEmoji(e) {
    const sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    const emoji = String.fromCodePoint(...codesArray)
    setIsShowPicker(false)
    props.onChange(emoji)
  }

  function showPicker(e) {
    setIsShowPicker(!isShowPicker)
  }


  return (
    <EmojiPickerContainer>
      <button
      onClick={showPicker}
      >
        {selectedEmoji}
      </button>

      <PickerModal isShowPicker={isShowPicker}>
        <Picker
        theme={currentTheme}
        onSelect={selectEmoji}
        showPreview={false}
        />

      </PickerModal>
    </EmojiPickerContainer>
  )
}

export default EmojiPicker
import React, { useState, useEffect } from 'react';

// Input 컴포넌트에서 사용할 props 정의
interface InputProps {
  label?: string      // 라벨
  labelTop?: boolean  // 라벨을 입력 상단에 배치할지 여부 
  type?: string       // 입력 값의 타입
  spacing?: number    // label과 input 사이의 간격
  width?: string      // 입력폼 너비
  value: string        // 입력값 (필수로 부모로부터 받음)
  labelWidth?: string // 라벨 너비
  mt?: number         // margin-top
  onChange?: (value: string) => void // 부모로 값을 전달하는 핸들러
}

/** 
 * @Script
 * * label: 라벨
 * * labelTop: 라벨을 입력 상단에 배치할지 여부 
 * * type: 입력 값의 타입
 * * spacing: label과 input 사이의 간격(Default 3 || 0)
 * * width: 입력폼 너비
 * * value: 입력값
 * * labelWidth: 라벨 너비
 * * mt: margin-top (1: 4px)
 * @Example
 * * label="100% || px"
 * * labelTop 
 * * type="number"
 * * spacing="10% || px"
 * * width="100% || px"
 * * value="텍스트 || 변수명"
 * * labelWidth="100% || px"
 * * mt={3}
 * * onChange={(e) => setValue(e.target.value)}
*/

const Input: React.FC<InputProps> = ({ 
  label,
  labelTop = false,
  type = 'text',
  spacing = label ? 3 : 0,
  width,
  value,
  labelWidth,
  mt,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value); // 내부 상태 관리

  // 부모로부터 전달된 value가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value); // 부모 컴포넌트에서 값이 바뀌었을 때, 상태 갱신
    }
  }, [value]);  // 부모에서 전달된 value를 감시하여 상태 변경

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue); // 부모로 값 변경을 알림
    }
  };

  return (
    <div style={{ width: '100%', display: labelTop ? 'block' : 'flex', marginTop: mt ? mt * 4 + 'px' : '0px'}}>
      {/* Label */}
      {label && (
        <div style={{ width: labelWidth, alignContent: 'center' }}>
          <label>{label}</label>
        </div>
      )}
      {/* Input Form */}
      <div style={{ marginLeft: labelTop ? '' : spacing * 4 + 'px' }}>
        <input
          value={inputValue}
          onChange={handleChange}
          type={type}
          style={{
            width: width, 
            height: '40px',
            border: '0.5px solid #bdbdbd',
            borderRadius: '3px'
          }}
        />
      </div>
    </div>
  );
};

export default Input;

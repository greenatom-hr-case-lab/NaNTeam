import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import '../AccountStyles/SelectField.css'

function SelectField(props) {
  let startValue
  const [options, setOptions] = useState(props.options.map(function(option, index) {
    return {id: option._id, label: option.name, value: index}
  }))
  if (props.value)
    startValue = { label: props.value, value: ''}
  else
    startValue = { label: 'Выберите', value: ''}
  console.log('startValue', startValue)
  useEffect(() => {
    setOptions(props.options.map(function(option, index) {
      return {id: option._id, label: option.name, value: index}
    }))
  }, [props.options])
  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      height: 32,
      overflow: 'none'
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    container: (provided) => ({
      ...provided,

    }),
    indicatorContainer: (provided) => ({
      ...provided,
      maxHeight: 16
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      maxHeight: 32
    }),
    control: (provided, state) => ({
      ...provided,
      /*minHeight: 38,
      width: 220,*/
      width: 200,
      minHeight: 32,
      borderRadius: 15,
      borderColor: 'silver',
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white'
    }),
    group: (provided) => ({
      ...provided,
      backgroundColor: 'green'
    }),
    option: (provided, state) => ({
      ...provided,
      borderColor: 'blue',
      backgroundColor: state.isFocused
        ?
        '#bed52d'
        :
        null,
      color: 'black'
    })
  }

    const onChange = (newValue) => {
      console.log(newValue)
      props.update(newValue)
    }
  return (
    <div className="item">
      <span>{props.title.name}</span>
      <AsyncSelect
        defaultValue={startValue}
        defaultOptions={options}
        styles={customStyles}
        onChange={(value) => props.update(value)}
        isDisabled={props.disabled}
      />
    </div>
    
  );
}

export default SelectField;
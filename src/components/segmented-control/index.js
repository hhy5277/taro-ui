import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AtComponent from '../../common/component'

export default class AtSegmentedControl extends AtComponent {
  constructor () {
    super(...arguments)
    if (process.env.NODE_ENV === 'test') {
      Taro.initPxTransform({ designWidth: 750 })
    }
  }

  handleClick () {
    if (this.props.disable) return
    this.props.onClick(...arguments)
  }

  render () {
    const {
      customStyle,
      className,
      disabled,
      values,
      selectedColor,
      current,
      color,
      fontSize
    } = this.props

    const rootStyle = {
      borderColor: selectedColor
    }
    const itemStyle = {
      color: selectedColor,
      fontSize: fontSize ? Taro.pxTransform(fontSize) : '',
      borderColor: selectedColor,
      backgroundColor: color,
    }
    const selectedItemStyle = {
      color,
      fontSize: fontSize ? Taro.pxTransform(fontSize) : '',
      borderColor: selectedColor,
      backgroundColor: selectedColor,
    }

    return (
      <View
        className={
          classNames({
            'at-segmented-control': true,
            'at-segmented-control--disabled': disabled
          }, className)
        }
        style={this.mergeStyle(rootStyle, customStyle)}
      >
        {
          values.map((value, i) => (
            <View
              className={classNames('at-segmented-control__item', {
                'at-segmented-control__item--active': current === i
              })}
              style={current === i ? selectedItemStyle : itemStyle}
              key={value}
              onClick={this.handleClick.bind(this, i)}
            >{value}</View>)
          )
        }
      </View>
    )
  }
}

AtSegmentedControl.defaultProps = {
  customStyle: '',
  className: '',
  current: 0,
  color: '',
  fontSize: 0,
  disabled: false,
  selectedColor: '',
  values: [],
  onClick: () => {},
}

AtSegmentedControl.propTypes = {
  customStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  className: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  current: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  values: PropTypes.array,
  onClick: PropTypes.func,
}

import React, { Component } from 'react'
import anime from 'animejs'
import '../static/SVGFill.css';
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.animate = null;
  }
  componentDidMount() {
    this.animate = anime({
      targets: '#mypath',
      d: [
        { value: "M4071,27V386.794s116.544-100.9,314.269-100.9,172.484,187.091,410.175,187.091,233.484-187.091,412.278-187.091S5437,489.8,5437,489.8V27Z" },
        { value: "M4071,27V878.717s168.527-74.606,366.252-74.606,138.889,103.027,376.58,103.027,215.55-103.027,394.344-103.027S5437,907.138,5437,907.138V27Z" },
      ],
      loop: false,
      easing: "easeInOutQuad",
      duration: 2000,
      autoplay: true,
    })
  }

  render() {
    return (
      <>
        <div className="wave_container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 768" preserveAspectRatio="none">
            <path id="mypath"
              d="M4071,27V54.452s52.243-16.817,249.969-16.817,183.567-8.375,421.258-8.375,285.609,8.7,464.4,8.7S5437,29.26,5437,29.26V27Z"
              transform="translate(5437 800) rotate(180)" fill="#7966FF" />
          </svg>
        </div>
      </>
    )
  }
}

export default MyComponent;
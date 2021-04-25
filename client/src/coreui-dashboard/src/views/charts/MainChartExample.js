import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChartExample = attributes => {
  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const defaultDatasets = (()=>{
    let elements = 27
    const data1 = [65, 116, 75, 140, 177, 51, 157, 60, 172, 130, 115, 162, 113, 168, 187, 125, 79, 93, 131, 65, 124, 112, 51, 116, 68, 121, 163, 126]
    const data2 = [93, 94, 91, 80, 88, 93, 96, 81, 93, 91, 95, 89, 84, 93, 83, 89, 98, 91, 97, 88, 83, 82, 100, 87, 95, 92, 93, 83]
    // for (let i = 0; i <= elements; i++) {
    //   data1.push(random(50, 200))
    //   data2.push(random(80, 100))
    // }
    console.log(data1);
    console.log(data2);
    return [
      {
        label: 'Number of users logged in',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      {
        label: 'Number of items uploaded',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2
      }
      // {
      //   label: 'My Third dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandDanger,
      //   pointHoverBackgroundColor: brandDanger,
      //   borderWidth: 1,
      //   borderDash: [8, 5],
      //   data: data3
      // }
    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
    />
  )
}


export default MainChartExample

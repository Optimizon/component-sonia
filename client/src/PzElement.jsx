import React from 'react';
import styles from './main.css';


// function generates stars for ratings out of 5
const starMaker = (numOfStars) => {
  let result = '';
  const litStars = [];
  const dimStars = [];
  if (numOfStars % 1 === 0) {
    const numOfDimStars = 5 - numOfStars;
    for (let i = 0; i < numOfStars; i += 1) {
      litStars.push(<img alt="lit star" className={styles.starInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/fullStar.png" />);
    }
    for (let i = 0; i < numOfDimStars; i += 1) {
      dimStars.push(<img alt="dim star" className={styles.starInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/emptyStar.png" />);
    }
    result = litStars.concat(dimStars);
  } else {
    const numOfDimStars = 5 - Math.ceil(numOfStars);
    const halfStars = [<img alt="half star" className={styles.starInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/halfStar+(1).png" />];
    for (let i = 0; i < Math.floor(numOfStars); i += 1) {
      litStars.push(<img alt="lit star" className={styles.starInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/fullStar.png" />);
    }
    for (let i = 0; i < numOfDimStars; i += 1) {
      dimStars.push(<img alt="dim star" className={styles.starInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/emptyStar.png" />);
    }
    result = litStars.concat(halfStars, dimStars);
  }
  return result;
};

// ==================================================

// function creates isPrime :

const isPrime = (booleanNum) => {
  if (booleanNum === 1) {
    return <img alt="isPrime" className={styles.primeInd} src="https://s3-us-west-1.amazonaws.com/pictures-hrsf/41636675_353124462093841_6086416954233454592_n.png" width="54" height="15" />;
  }
};

// =============================================

// function shortens product discription:

const lessWord = (str) => ((str.length > 50) ? str.split('').slice(0, 50).join('') : str);

// =============================================


const PzElement = props => {
  console.log("props", props)
  return (
    
  <div className={styles.child}>
    <img alt="product" className={styles.element} src={props.element.imageurl} />
    <div className={styles.text}>
      {lessWord(props.element.productdescription)}
      {'...'}
    </div>
    <div className={styles.star}>
      <span>{starMaker(props.element.rating)}</span>
      {' '}
      <span className={styles.review}>
        {props.element.reviewnumber}
      </span>
    </div>
    <div>
      <span className={styles.price}>
      $
        {props.element.price}
      </span>
      {' '}
      <span>{isPrime(props.element.isprime)}</span>
    </div>
  </div>
  )
};


export default PzElement;

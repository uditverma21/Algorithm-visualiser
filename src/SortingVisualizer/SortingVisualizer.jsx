import React from 'react';
import * as algo from '../sortingAlgos/sortingAlgos'
import './SortingVisualizer.css';

let ANIMATION_SPEED_MS = 10;
let NUMBER_OF_ARRAY_BARS = 50;
let DEFAULT_COLOR = '#444444';
let COMPARE_COLOR = 'blue';
let SWAP_COLOR = 'red';
let stop = false;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    stopAnimations() {
        stop = true;
        setTimeout(() => {
            stop = false;  
        }, ANIMATION_SPEED_MS);
    }

    componentDidMount() {
        this.randomArray(this.generateArray());
        this.stopAnimations();
    }

    generateArray() {
        let array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(50 + 10 * i);
        }
        return array;
    }

    randomArray() {
        let array = this.generateArray();
        array.sort(() => 0.5 - Math.random());
        this.setState({ array });
        this.stopAnimations();
    }

    nearlySortedArray() {
        let array = this.generateArray();
        array.sort(() => 0.9 - Math.random());
        this.setState({ array });
        this.stopAnimations();
    }

    fewUniqueArray() {
        let array = [];
        for (let i = 0; i < 50; i++) {
            array.push(50 + 100 * Math.ceil((i+1)/10));
        }
        array.sort(() => 0.5 - Math.random());
        this.setState({ array });
        this.stopAnimations();
    }

    reverseArray() {
        let array = this.generateArray();
        array.reverse();
        this.setState({ array });
        this.stopAnimations();
    }

    sortedArray() {
        var array = this.state.array;
        array.sort((a, b) => a - b);
        this.setState({ array });
        this.stopAnimations();
    }

    animate(algo, isMerge) {
        let animations = algo(this.state.array);
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            if(stop === true) {
                break;
            }
            let arrayBars = document.getElementsByClassName('array-bar');
            let [operation, barOneIdx, barTwoIdx, newHeightOne, newHeightTwo] = animations[i];
            let barOneStyle = arrayBars[barOneIdx].style;
            let barTwoStyle = arrayBars[barTwoIdx].style;
            if(operation === "compare") {
                setTimeout(() => {
                    barOneStyle.backgroundColor = COMPARE_COLOR;
                    barTwoStyle.backgroundColor = COMPARE_COLOR;
                }, i*ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barOneStyle.backgroundColor = DEFAULT_COLOR;
                    barTwoStyle.backgroundColor = DEFAULT_COLOR;
                }, (i+1)*ANIMATION_SPEED_MS);
            }
            else if(operation === "swap") {
                setTimeout(() => {
                    barOneStyle.backgroundColor = SWAP_COLOR;
                    barTwoStyle.backgroundColor = SWAP_COLOR;
                    barOneStyle.height = `${newHeightOne}px`;
                    barTwoStyle.height = `${newHeightTwo}px`;
                }, i*ANIMATION_SPEED_MS);
                setTimeout(() => {
                    barOneStyle.backgroundColor = DEFAULT_COLOR;
                    barTwoStyle.backgroundColor = DEFAULT_COLOR;
                }, (i+1)*ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        let { array } = this.state;
        return (
            <div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: DEFAULT_COLOR,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
                <div className="button-container">
                    <div className="generate-buttons">
                        <h3>Generate New Array</h3>
                        <button onClick={() => this.randomArray()}>Random</button> 
                        <button onClick={() => this.nearlySortedArray()}>Nearly Sorted</button> 
                        <button onClick={() => this.fewUniqueArray()}>Few Unique</button> 
                        <button onClick={() => this.reverseArray()}>Reverse</button> 
                        <button onClick={() => this.sortedArray()}>Sorted</button>
                    </div>
                    <div className="sort-buttons">
                        <h3>Sorting Algorithms</h3>
                        <button onClick={() => this.animate(algo.mergeSort, true)}>Merge Sort</button>
                        <button onClick={() => this.animate(algo.bubbleSort, false)}>Bubble Sort</button>
                        <button onClick={() => this.animate(algo.quickSort, false)}>Quick Sort</button>
                        <button onClick={() => this.animate(algo.heapSort, false)}>Heap Sort</button>
                    </div>
                </div>
            </div>
        );
    }
}
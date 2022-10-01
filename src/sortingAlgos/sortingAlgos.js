// QUICK SORT BEGIN

export let quickSort = array => {
  let animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  console.log(array);
  return animations;
}

let quickSortHelper = (array, startIdx, endIdx, animations) => {
  if(startIdx >= endIdx) return;
  let partitionIdx = getPartition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, partitionIdx-1, animations);
  quickSortHelper(array, partitionIdx+1, endIdx, animations);
}

let getPartition = (array, startIdx, endIdx, animations) => {
  let pivot = array[endIdx];
  let i = (startIdx - 1);
  for (let j = startIdx; j <= endIdx - 1; j++) {
    animations.push(["compare", endIdx, j]);
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      animations.push(["swap", i, j, array[i], array[j]]);
    }
  }
  animations.push(["compare", endIdx, i+1]);
  [array[i+1], array[endIdx]] = [array[endIdx], array[i+1]];
  animations.push(["swap", i+1, endIdx, array[i+1], array[endIdx]]);
  return i + 1;
}

// QUICK SORT END

// -------------------------------------------------------------------------------------- //

// BUBBLE SORT BEGIN

export let bubbleSort = array => {
  let animations = [];
  let k=0;
  while(k<array.length) {
      let i=1;
      while(i<(array.length-k)) {
          animations.push(["compare", i, i-1]);
          if(array[i-1]>array[i]) {
            [array[i-1],array[i]]=[array[i],array[i-1]];
            animations.push(["swap", i, i-1, array[i], array[i-1]]);
          }
          i++;
      }
      k++;
  }
  return animations;
}

// BUBBLE SORT END

// -------------------------------------------------------------------------------------- //

// MERGE SORT BEGIN

export let mergeSort = array => {
  let animations = [];
  let auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

let mergeSortHelper =(mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  let middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

let doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["compare",i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push(["swap", k, k, auxiliaryArray[i], auxiliaryArray[i]]);  
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push(["swap", k, k, auxiliaryArray[j], auxiliaryArray[j]]);  
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["compare", i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push(["swap", k, k, auxiliaryArray[i], auxiliaryArray[i]]);  
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push(["compare", j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    // animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push(["swap", k, k, auxiliaryArray[j], auxiliaryArray[j]]);  
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// MERGE SORT END

// -------------------------------------------------------------------------------------- //

// HEAP SORT BEGIN

export let heapSort = array => {
  let animations = []; 
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i, animations);
  }
  for (var i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    animations.push(["swap", i, 0, array[i], array[0]]);
    heapify(array, i, 0, animations);
  }
  console.log(array);
  return animations;
}

let heapify = (array, n, i, animations) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  animations.push(["compare", i, largest]);  
  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push(["swap", i, largest, array[i], array[largest]]);
    heapify(array, n, largest, animations);
  }
}
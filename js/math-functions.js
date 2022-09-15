function randomWeight(weights){
  let random = Math.random() ,length = weights.length,totalWeight=0,indexChoose,minPeriod,maxPeriod,period=[];
  for(let i = 0 ; i < length;i++){
    totalWeight = totalWeight + weights[i];
    period[i] = totalWeight;
  }
  for(let i = 0; i< length ; i++){

    minPeriod = (i==0)? 0: period[i-1]/totalWeight;
    maxPeriod = (i == length - 1)? 1 : period[i]/totalWeight;
    if(random >= minPeriod && random <= maxPeriod){
      indexChoose = i;
      break;
    }
  }
  return indexChoose;
}

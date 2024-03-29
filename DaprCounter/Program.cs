﻿using Dapr.Client;

// Failed when the Store had an uppercase, now i know why, 
// statestore refers to the default store defined in C:\Users\Puma\.dapr\components\statestore.yaml
const string storeName = "statestore";
const string key = "counter";

var daprClient = new DaprClientBuilder().Build();
var counter = await daprClient.GetStateAsync<int>(storeName, key);

while(true){
    Console.WriteLine($"Counter = {counter++}");
    await daprClient.SaveStateAsync(storeName, key, counter);
    await Task.Delay(1000);
}
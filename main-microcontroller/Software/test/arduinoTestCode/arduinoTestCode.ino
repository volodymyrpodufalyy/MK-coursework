const int buttonPin = 25;
const int secondButtonPin = 27;
int timer = 1000;
int inByte;

void setup() {
  // initialize UART0
  Serial.begin(9600);
  Serial.setTimeout(10);
  for (int thisPin = 42; thisPin <= 49; thisPin++) {
    pinMode(thisPin, OUTPUT);
  }
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(secondButtonPin, INPUT_PULLUP);
}

void loop() {
  int temperature = 25;
  String data = "{ \"type\": \"temperature\", \"value\": \"${temperature} C\" }";
  data.replace("${temperature}", String(temperature));
  Serial.println(data);
  delay(30000);
  if (Serial.available()) {
    String ReaderFromNode = Serial.readString();
    if (ReaderFromNode == "on") {
     for(int led = 49; led >= 42; led--){
      if((led % 2) != 0) {
        digitalWrite(led,HIGH);
        delay(timer);
        digitalWrite(led,LOW);
       }
     }
     delay(timer);
     for(int led = 48; led >= 42; led--){
      if((led % 2) == 0) {
        digitalWrite(led,HIGH);
        delay(timer);
        digitalWrite(led,LOW);
      }
     }  
    } else if (ReaderFromNode == "off") {
     int i=50;
     int j=41;
     while(j<i - 1){
       j++;
       i--;
       digitalWrite(j,HIGH);
       delay(timer);
       digitalWrite(j,LOW);
       digitalWrite(i,HIGH);
       delay(timer);
       digitalWrite(i,LOW);
     } 
    }
  }

  // write commands to GUI
  if(digitalRead(buttonPin)==LOW){
    Serial.println("Button 1 fired");
  } else if (digitalRead(secondButtonPin)==LOW) {
    Serial.println("Button 2 fired");
  }
}

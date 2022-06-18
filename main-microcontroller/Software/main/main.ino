
// -------------------------- LCD Connection ----------------------------------------
// https://www.arduino.cc/reference/en/libraries/liquidcrystal/
// library of LCD
#include <LiquidCrystal.h>
// Pins of LCD interface
const int rs = 30, rw = 31, en = 32, d0 = 22, d1 = 23, d2 = 24, d3 = 25, d4 = 26, d5 = 27, d6 = 28, d7 = 29;
// LCD inicialization
LiquidCrystal lcd(rs, rw, en, d0, d1, d2, d3, d4, d5, d6, d7);

// --------------------------- Relays Connection -------------------------------------
#define RelayT  51              //Relay Temp
#define RelayF  52              //Relay Fan
#define RelayH  53              //Relay Hum
char HumSwOn;
char TempSwOn;
char FanSwOn;
// --------------------------- Encoder Connection ------------------------------------
//#include <Arduino.h>
#include <RotaryEncoder.h>

#define TempSetStep 1
#define TempSetMin 0
#define TempSetMax 100
int TempSetVal = 50;                        //Theshold value of Temp
float TempCur;                                 //Current value of Temp

#define HumSetStep 1
#define HumSetMin 0
#define HumSetMax 100
int HumSetVal = 50;                         //Theshold value Humidity
float HumCur;                               //Current value of Humidity

#define ROTARYSTEPS 1
#define ROTARYMIN 0
#define ROTARYMAX 100
int EncoderStart = 50;
int EncoderPos;

#define REnc_PIN_A 36
#define REnc_PIN_B 37

#define REnc_SW_PIN 38                      //Switch Temp_setting/Humidity_setting

unsigned char REnc_Temp_Set_Mode = 1;       //1-Temp_setting, 0-Humidity_setting

RotaryEncoder encoder(REnc_PIN_A, REnc_PIN_B, RotaryEncoder::LatchMode::TWO03);

// --------------------------- DHT22 Connection ------------------------------------
#include "DHT.h"

#define DHTPIN 43     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

// --------------------------- Serial Port ------------------------------------
// https://www.arduino.cc/reference/en/language/functions/communication/serial/available/

int incomingByte = 0;
//-------------------------------------------------------------------------
int EncoderReading(void) {
  int Delta = 0;
  encoder.tick();
  int EncoderNewPos = encoder.getPosition() * ROTARYSTEPS;

  if (EncoderNewPos < ROTARYMIN) {
    encoder.setPosition(ROTARYMIN / ROTARYSTEPS);
    EncoderNewPos = ROTARYMIN;

  } else if (EncoderNewPos > ROTARYMAX) {
    encoder.setPosition(ROTARYMAX / ROTARYSTEPS);
    EncoderNewPos = ROTARYMAX;
  }

  if (EncoderPos != EncoderNewPos) {                                      //Encoder was changed
    Delta = (EncoderNewPos - EncoderPos) / ROTARYSTEPS;
    EncoderPos = EncoderNewPos;

    /*    Serial.print("Delta:");
        Serial.print(Delta);
        Serial.print("pos:");
        Serial.print(EncoderNewPos);
        Serial.print(" dir:");
        Serial.println((int)(encoder.getDirection()));*/
  }
  return Delta;
}
//-------------------------------------------------------------------------
void SetTempHum(int Delta)
{
  REnc_Temp_Set_Mode = digitalRead(REnc_SW_PIN);

  if (REnc_Temp_Set_Mode == 1) TempSetVal += Delta * TempSetStep;
  else HumSetVal += Delta * HumSetStep;

  if (TempSetVal > TempSetMax)TempSetVal = TempSetMax;
  if (HumSetVal > HumSetMax)HumSetVal = HumSetMax;
  if (TempSetVal < TempSetMin)TempSetVal = TempSetMin;
  if (HumSetVal < HumSetMin)HumSetVal = HumSetMin;

  /*  Serial.print("\n\r TSet=");
    Serial.print(TempSetVal);
    Serial.print("   HumSet=");
    Serial.print(HumSetVal);*/
}
//-------------------------------------------------------------------------
void ReatTempHum(void)
{
  // --------------------- DHT sensor test ------------------------------
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  TempCur = t;
  HumCur = h;
  /*  Serial.print(F("\n\rHumidity: "));
    Serial.print(HumCur);
    Serial.print(F("%  Temperature: "));
    Serial.print(TempCur);
    Serial.print(F("°C "));*/
}
//-------------------------------------------------------------------------
void printLCD(void)
{
  int tt;

  //----------- Print Hummidity on LCD ----------------
  lcd.setCursor(0, 0);
  lcd.print("H=  . %     %");
  tt = HumCur;
  lcd.setCursor(2, 0);
  lcd.print(tt, DEC);
  tt = (HumCur - tt) * 10;
  lcd.setCursor(5, 0);
  lcd.print(tt, DEC);
  lcd.setCursor(9, 0);
  lcd.print(">");
  tt = HumSetVal;
  lcd.print(tt, DEC);
  //----------- Print Temp on LCD ----------------
  lcd.setCursor(0, 1);
  lcd.print("T=  . oC    oC");
  tt = TempCur;
  lcd.setCursor(2, 1);
  lcd.print(tt, DEC);
  tt = (TempCur - tt) * 10;
  lcd.setCursor(5, 1);
  lcd.print(tt, DEC);
  lcd.setCursor(9, 1);
  lcd.print(">");
  tt = TempSetVal;
  lcd.print(tt, DEC);
}
//-------------------------------------------------------------------------
void RelaySet(void)
{
  if (TempCur < TempSetVal)TempSwOn = 1;
  else TempSwOn = 0;
  if (HumCur < HumSetVal)HumSwOn = 1;
  else HumSwOn = 0;

  FanSwOn = HumSwOn | TempSwOn;

  if (TempSwOn == 1)digitalWrite(RelayT, HIGH);        //To Low Temp - Switch ON Heater
  else digitalWrite(RelayT, LOW);

  if (HumSwOn == 1)digitalWrite(RelayH, HIGH);         //To Low Humidity - Switch ON Moisturizer
  else digitalWrite(RelayH, LOW);

  if (FanSwOn == 1)digitalWrite(RelayF, HIGH);         //Switch ON Fan for smoothing Temperature & Hummidity
  else digitalWrite(RelayF, LOW);
}
//-------------------------------------------------------------------------
String response = "{ \"humidity\": \"${humidity}\", \"temperature\": \"${temperature}\", \"humStatus\": \"${humStatus}\", \"tempStatus\": \"${tempStatus}\", \"fanStatus\": \"${fanStatus}\" }";
void checkStatus(String key, char value) {
  if (value == 1) response.replace(key, "on");
  else response.replace(key, "off");
}
void SerialTest(void)
{
  if (Serial.available() > 0)
  {
    // read the incoming byte:
    incomingByte = Serial.read();
    if (incomingByte == '?')                                //Request for printing values '?'
    {
      response.replace("${humidity}", String(HumCur));
      response.replace("${temperature}", String(TempCur));
      
      checkStatus("${humStatus}", HumSwOn);
      checkStatus("${tempStatus}", TempSwOn);
      checkStatus("${fanStatus}", FanSwOn);
      Serial.println(response);
//      Serial.print(HumCur, DEC);
//      Serial.print(" Ht=");
//      Serial.print(HumSetVal);
//      Serial.print(" T=");
//      Serial.print(TempCur, DEC);
//      Serial.print(" Tt=");
//      Serial.print(TempSetVal, DEC);
//      Serial.print(" Moisturizer=");
//      Serial.print(HumSwOn, DEC);
//      Serial.print(" Heater=");
//      Serial.print(TempSwOn, DEC);
//      Serial.print(" Fan=");
//      Serial.print(FanSwOn, DEC);
    }

    if (incomingByte == '!')                                //Request for Setting Thresholds "!HHTT": HH-HummSetVal, TT-TempSetVal (if H or T is not digit it is restored 0 - !A45K -> HumSetVal=04 & TempSetVal=50)
    {
      //      Serial.print("\n\rEnter Hummidity threshold:");
      while (Serial.available() == 0);                     //HumSetVal reading
      incomingByte = Serial.read();
      if (!isDigit(incomingByte))incomingByte = '0';
      HumSetVal = 10 * (incomingByte - '0');
      while (Serial.available() == 0);
      incomingByte = Serial.read();
      if (!isDigit(incomingByte))incomingByte = '0';
      HumSetVal += (incomingByte - '0');

      while (Serial.available() == 0);                     //TempSetVal reading
      incomingByte = Serial.read();
      if (!isDigit(incomingByte))incomingByte = '0';
      TempSetVal = 10 * (incomingByte - '0');
      while (Serial.available() == 0);
      incomingByte = Serial.read();
      if (!isDigit(incomingByte))incomingByte = '0';
      TempSetVal += (incomingByte - '0');

      Serial.print("Ht=");
      Serial.print(HumSetVal);
      Serial.print(" Tt=");
      Serial.print(TempSetVal);
    }
  }
}
//-------------------------------------------------------------------------
void setup() {

  // ------------- LCD Init ----------------------------------
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 4);
  // Print a message to the LCD.
  /*  lcd.setCursor(0, 0);
    lcd.print("Circuit #1 Project");
    delay(100);
  */

  // ------------- Encoder Init ----------------------------------
  pinMode(REnc_SW_PIN, INPUT_PULLUP);
  encoder.setPosition(EncoderStart / ROTARYSTEPS);
  encoder.tick();
  EncoderPos = encoder.getPosition() * ROTARYSTEPS;

  // ------------- Serial Communication Init ---------------------
  Serial.begin(9600);
  //  Serial.println(F("Test!"));
  Serial.setTimeout(10);
  Serial.println("Initialized device");

  // ------------- DHT11 Sensor Init ------------------------------
  dht.begin();

  // ------------- Relays Init ------------------------------
  pinMode(RelayT, OUTPUT);
  digitalWrite(RelayT, LOW);
  pinMode(RelayF, OUTPUT);
  digitalWrite(RelayF, LOW);
  pinMode(RelayH, OUTPUT);
  digitalWrite(RelayH, LOW);

}
//-------------------------------------------------------------------------
void loop() {


  int n = EncoderReading();               //Read Encoder's increment
  if (n != 0) SetTempHum(n);              //Set new Thresholds
  ReatTempHum();                          //Read sensor
  printLCD();                             //Renew LCD
  RelaySet();                             //Send control signals to Relays
  SerialTest();                           //Test serial port status & parse if is not empty

}
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------

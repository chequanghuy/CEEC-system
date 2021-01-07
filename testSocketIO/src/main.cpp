#include <string.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <SocketIoClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <ArduinoJson.h>
#include <string.h>
#define TRIG_PIN 3    // Chân Trig nối với chân 8
#define ECHO_PIN 4    // Chân Echo nối với chân 7
#define TIME_OUT 5000 // Time_out của pulseIn là 5000 microsecond
#include <Servo.h>
Servo servo;
const long utcOffsetInSeconds = 25200;
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
int lastTime = 0;
const char *mode;
bool flags = true;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);
SocketIoClient webSocket;
SoftwareSerial stm2esp(13, 15);

StaticJsonBuffer<200> jsonBuffer;
JsonObject &root = jsonBuffer.createObject();
float getDistance()
{
  long duration, distanceCm;
  // Phát 1 xung 10uS từ chân Trig
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  // Thời gian tín hiệu phản hồi lại chân Echo
  duration = pulseIn(ECHO_PIN, HIGH, TIME_OUT);

  // Tính khoảng cách
  distanceCm = duration / 29.1 / 2;
  // trả lại giá trịnh tính được
  return distanceCm;
}
void open(const char *message, size_t length)
{
  servo.write(0);
  flags = false;
}
void close(const char *message, size_t length)
{
  servo.write(180);
  flags = true;
}
void statusdoor(const char *message, size_t length)
{
  if (!strcmp(message, "on"))
  {
    servo.write(0);
    flags = false;
  }
  if (!strcmp(message, "off"))
  {
    servo.write(180);
    flags = true;
  }
}
void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  stm2esp.begin(9600);
  servo.attach(1);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  WiFi.begin("KimLoan", "08102000");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("");
  Serial.println("WiFi connected");
  Serial.print("IP Address : ");
  Serial.println(WiFi.localIP());

  webSocket.begin("192.168.1.250", 8000);
  webSocket.on("open-door", open);
  webSocket.on("close-door", close);
  webSocket.on("status-door", statusdoor);
  webSocket.emit("send-data", "\"hahaha\"");
}
uint64_t messageTimestamp;
void loop()
{
  // put your main code here, to run repeatedly:
  webSocket.loop();
  uint64_t now = millis();
  if (now - messageTimestamp > 2000)
  {
    messageTimestamp = now;
    // Send event
    char str[32];
    dtostrf(getDistance(), 8, 2, str);
    webSocket.emit("data-srf", str);
  }
}
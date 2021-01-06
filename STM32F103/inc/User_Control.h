#ifndef __USER_CONTROL_H
#define __USER_CONTROL_H

#include "User_USART2.h"
#include "stm32f10x.h"
#include "delay.h"
#include "tm_stm32f10x_mfrc522.h"
#include "User_FLASH.h"
#include "User_GPIO.h"
#include "stm32f10x_iwdg.h"
#include "User_TIM.h"
#include "display.h"
#include <string.h>
#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include <ctype.h>
#include "ssd1306.h"

extern volatile uint8_t checkDisplay;

static char COLON[] = " : ";

/*==================================*/
#define ID_NOT_FOUND -1

//angle for servo close or open door
#define SERVO_ANGLE_CLOSE 90
#define SERVO_ANGLE_OPEN	40

//status of door (open or close)
#define CLOSE 0
#define OPEN 1

//define page
#define PAGE0 0
#define PAGE1 1
#define PAGE2 2
#define PAGE3 3
#define PAGE4 4




typedef struct TimeAndWeather {
	char hours[2];
	char mins[2];
	char secs[2];
	char weather[10];
}TAW;

typedef struct USerData{
	char index[3];
	char cardID[5];
	char name[30];
	char mssv[10];
}UD;

typedef struct JsonIN{
	char type[1];
	char mode[1];
	TAW time;
	UD user;
}JsonIN_V;
/*========Variable==============*/

// page 0
extern uint16_t Emer_flag; //emergency case occure
extern uint16_t Nbr_ID; //number of ID
/*
*	If One touch mode turn on, evertime you press button, door will be opened without requiring password.
*/
extern uint8_t OneTouch; //one touch to open door
extern uint16_t password[31]; //password for user


extern volatile uint8_t Enter_pass_remove_alert;//flag allow enter password to remove alert

extern uint8_t Door_status;//door's status (open or close)


extern char TempBuff[50];

extern volatile uint16_t buff_pos;
extern volatile uint16_t buff[100];
extern volatile uint8_t receive_flag;

extern uint8_t ScanedID[5];

extern volatile uint8_t AddMember_flag;

extern volatile uint8_t RemoveMember_flag;

extern volatile uint8_t ChangePassword_flag;

extern volatile uint8_t Parse_flag;

extern volatile uint8_t OneTouchMode_flag;

extern volatile uint8_t OpenDoorUSART_flag;

//===================convert data=================
uint16_t* ConvertCharToUint16(char *s);
char* ConvertUint16ToChar(uint16_t* s);
char* ConvertUint8ToChar(uint8_t* s);
uint8_t* ConvertCharToUint8(char *s);
uint8_t* ConvertUint16ToUint8(uint16_t *s);
char *Convert_Dec_To_String_Hex(uint8_t num);
void Parse(void);

//===================PAGE 0==================
/*
- Read and Write (emergency flag; number of ID; one touch mode; password) to flash
*/
//void Write_EmerFlag(uint16_t E_flag);
//void Updata_EmerFlag(void);

void Write_NbrID(uint16_t Nbr);
void Update_NbrID(void);

//write all value in page 0
void Write_Page0(uint16_t Nbr);

void Updata_Data_From_PAGE0(void);

extern void Display_PAGE0(void);

//=======================PAGE 1====================
// SIZE: 2bytes/ID[index]; 10bytes/ID <=> 5pos/ID
/*
-	Add new ID[5] into flash
*/
void Add_ID (uint8_t* InID);
/*
-	compare InputID[5] vs list ID in flash
- return -1 as not found, else this is ID'index in flash
*/
int8_t Search_ID (uint8_t* InID);
/*
-	pick a ID[5] from flash
- return Null if not found
*/
uint8_t* Pick_ID (uint8_t index);
/*
- remove a ID from flash base on index
*/
void Remove_ID (uint8_t index);
//=======================PAGE 2====================
// SIZE: 2bytes/Name[index]; 20bytes/Name <=> 10pos/Name
/*
-	Add new Name[10] into flash
*/
void Add_Name (uint8_t* InName);
/*
-	compare InputName[10] vs list Name in flash
- return -1 as not found, else this is Name'index in flash
*/
int8_t Search_Name (uint8_t* InName);
/*
-	pick a Name[10] from flash
- return Null if not found
*/
uint8_t* Pick_Name (uint8_t index);
/*
- remove a Name from flash base on index
*/


/*-----------------For all function above--------------*/
void Add_Mem_Procedure(void);
void Add_NewMem(uint8_t* InID,uint8_t* InName);
void Remove_Mem_Procedure(void);
void Remove_Mem(uint8_t index);
void Display_ID(uint8_t index);






/*-----------------------------

check alert
return TRUE if alert occure
			FALSE for opposite
*/
uint8_t CheckAlert (void);

/*
check door's status base on switch
*/
uint8_t CheckDoorStatus(void);

/*

reset a array uint16_t to '\0', length
*/
void ResetArr(uint16_t* arr, uint8_t leng);

/*
compare password
*/


/*
require password
return true if right password
return false if wrong password
*/

/*
check scaned ID vs list of ID
*/
uint8_t CheckScanedID(uint8_t* IDCheck);

/*
Display the option menu
*/
void DisplayMenu(void);

/*
compare 2 string uint16_t* vs char*
*/
uint8_t CompareUintChar(uint16_t* s1, char* s2, uint8_t leng);

/*
Change password current
*/

/*
Receive interrupt usart2
*/
void USART2_IRQHandler(void);





void Display_Init(void);

void Display_watch(char hours[], char mins[], char secs[], char weather[]);
void Display_Func(char mode);
#endif /*__USER_CONTROL_H */
/*******END OF FILE****/

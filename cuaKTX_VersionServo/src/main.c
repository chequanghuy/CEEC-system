#include <main.h>
#include <string.h>
#include "User_Control.h"
#include "ssd1306.h"


volatile char isReceived = 0;
char uartData[10000];
char rx_Buffer[1];

int main (void) {
	/*------------watchdog----------*/
	IWDG_WriteAccessCmd(IWDG_WriteAccess_Enable);
	IWDG_SetPrescaler(IWDG_Prescaler_256); //xung nhip IWDG la 40KHz, chon prescaler la 256
	IWDG_SetReload(3125); //thoi gian de IWDG dem nguoc va reset lai la 20s => chon gia tri 3125, 4=3125/(40KHz/256)
	IWDG_ReloadCounter(); //reset lai thoi gian.
	IWDG_Enable();
	/*--------------------------------*/
	User_GPIO_Init();
	DelayInit();
	TM_MFRC522_Init();
	User_TIM_Init();
	User_USART2_Init(9600);
	/* Init state */
	Door_status=CLOSE;
	User_TIM_Handle(SERVO_ANGLE_CLOSE);
	Turn_led_close(ON);
	Turn_led_open(OFF);
	
	//Write_Page0(0, Nbr_ID, OneTouch,ConvertCharToUint16("159753"));
	
	Updata_Data_From_PAGE0();
	
	SSD1306_Init();
	
	/*---------------------loop while---------------------*/
	while (1) {
			//TM_MFRC522_Init();
		if (checkDisplay)
		{
			Display_Func('3');
			checkDisplay = 0;
		}
		if (TM_MFRC522_Check(ScanedID) == MI_OK){	//Read RFID
			IWDG_ReloadCounter(); //reset lai thoi gian.
			char *rfid_read;
			char json_sent[100] = "{\"Type\": \"4\", \"CardID\": \"";
			char after_json[] = "\"}\n";
			char id_array[10];
			rfid_read = ConvertUint8ToChar(ScanedID);
			
			for (int i = 0; i < sizeof(id_array); i ++)
			{
				id_array[i] = rfid_read[i];
			}
			
			strcat(json_sent, id_array);
			strcat(json_sent, after_json);
			
			User_USART2_SendSchar(json_sent);
			
			Display_Func('0');
			checkDisplay = 1;
			/*SSD1306_GotoXY(62, 44);
			SSD1306_Puts(json_sent, &Font_7x10, SSD1306_COLOR_WHITE);
			SSD1306_UpdateScreen(); 
			SSD1306_Fill(SSD1306_COLOR_BLACK);*/
			DelayMs(2000);
		}
		//-----------------------add new member-----------------------
		if(Parse_flag){
			IWDG_ReloadCounter();
			Parse();
			Parse_flag=FALSE;
		}
		IWDG_ReloadCounter(); //reset lai thoi gian.
		//--------------------end loop-------------------
	}
}


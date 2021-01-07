#include "display.h"
#include <string.h>

volatile uint8_t checkDisplay = 1;

void Display_Init(void)
{
    SSD1306_Init();
}

void Display_watch(char hours[], char mins[], char secs[], char weather[])
{	
		SSD1306_Init();
    char Time_display_Str[10] = "";
    strcat(Time_display_Str, hours);
    strcat(Time_display_Str, COLON);
    strcat(Time_display_Str, mins);

    SSD1306_GotoXY(62, 20);
    SSD1306_Puts(Time_display_Str, &Font_7x10, SSD1306_COLOR_WHITE);
    SSD1306_GotoXY(62, 44);
    SSD1306_Puts(weather, &Font_7x10, SSD1306_COLOR_WHITE);
    SSD1306_UpdateScreen(); 
		SSD1306_Fill(SSD1306_COLOR_BLACK);
}

void Display_Func(char mode)
{
	if (mode == '0')
	{
		SSD1306_GotoXY(25, 20);
		SSD1306_Puts("Waiting...", &Font_7x10, SSD1306_COLOR_WHITE);
		SSD1306_UpdateScreen(); 
	}
	else 
		if (mode == '1')
		{
			SSD1306_GotoXY(20, 20);
			SSD1306_Puts("CARD Accept", &Font_7x10, SSD1306_COLOR_WHITE);
			SSD1306_UpdateScreen(); 
			SSD1306_Fill(SSD1306_COLOR_BLACK);
		}
		else 
			if (mode == '2')
			{
				SSD1306_GotoXY(25, 20);
				SSD1306_Puts("Request False", &Font_7x10, SSD1306_COLOR_WHITE);
				SSD1306_UpdateScreen(); 
				SSD1306_Fill(SSD1306_COLOR_BLACK);
			}
			else	if (mode == '3')
						{
							SSD1306_GotoXY(27, 20);
							SSD1306_Puts("SMART DOOR", &Font_7x10, SSD1306_COLOR_WHITE);
							SSD1306_UpdateScreen(); 
							SSD1306_Fill(SSD1306_COLOR_BLACK);
						}
}
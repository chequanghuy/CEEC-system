#ifndef DISPLAY_H
#define DISPLAY_H

#include "ssd1306.h"

extern volatile uint8_t checkDisplay;

static char COLON[] = " : ";

void Display_Init(void);

void Display_watch(char hours[], char mins[], char secs[], char weather[]);
void Display_Func(char mode);

#endif
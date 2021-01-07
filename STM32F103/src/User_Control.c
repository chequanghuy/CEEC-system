#include "User_Control.h"
#include "jsmn.h"

uint16_t Emer_flag=FALSE; //emergency case occure
uint16_t Nbr_ID=0; //number of ID

uint8_t Door_status=OPEN;//preveous door's status (open or close)

char TempBuff[50];

volatile uint16_t buff_pos=0;
volatile uint16_t buff[100];
volatile uint8_t receive_flag=FALSE;

uint8_t ScanedID[5]={0x00,0x00,0x00,0x00,0x00};

volatile uint8_t Enter_pass_remove_alert=FALSE;

volatile uint8_t AddMember_flag=FALSE;

volatile uint8_t Parse_flag=FALSE;

volatile uint8_t RemoveMember_flag=FALSE;

volatile uint8_t ChangePassword_flag=FALSE;

volatile uint8_t OneTouchMode_flag=FALSE;

volatile uint8_t OpenDoorUSART_flag=FALSE;

/* Begin Json Define */
static int jsoneq(const char *json, jsmntok_t *tok, const char *s) {
  if (tok->type == JSMN_STRING && (int)strlen(s) == tok->end - tok->start &&
      strncmp(json + tok->start, s, tok->end - tok->start) == 0) {
    return 0;
  }
  return -1;
}




void parsing(char *jSC_D, char *dataAC, uint8_t data_Len)
{
	int j;
	for (j = 0; j < data_Len; j ++)
	{
		jSC_D[j] = dataAC[j];
	}
	jSC_D[j] = '\0';
}


JsonIN_V ParseJson(char *data)
{
	jsmn_parser p;
	jsmntok_t t[20]; 
	jsmn_init(&p);
	JsonIN_V jSC;
	char sss[1000];
	int r = jsmn_parse(&p, data, strlen(data), t, sizeof(t) / sizeof(t[0]));
	
	for (int i = 1; i < r; i++)
	{
		if (jsoneq(data, &t[i], "Type") == 0)
		{
			strcpy(sss, data + t[i + 1].start);
			uint8_t data_Len = t[i + 1].end - t[i + 1].start;
			parsing(jSC.type, sss, data_Len);
		}
		else
			if (jsoneq(data, &t[i], "Mode") == 0)
			{
				strcpy(sss, data + t[i + 1].start);
				uint8_t data_Len = t[i + 1].end - t[i + 1].start;
				parsing(jSC.mode, sss, data_Len);
			}
			else
				if (jsoneq(data, &t[i], "Hours") == 0)
				{
					strcpy(sss, data + t[i + 1].start);
					uint8_t data_Len = t[i + 1].end - t[i + 1].start;
					parsing(jSC.time.hours, sss, data_Len);
				}
				else
					if (jsoneq(data, &t[i], "Minutes") == 0)
					{
						strcpy(sss, data + t[i + 1].start);
						uint8_t data_Len = t[i + 1].end - t[i + 1].start;
						parsing(jSC.time.mins, sss, data_Len);
					}
					else
						if (jsoneq(data, &t[i], "Seconds") == 0)
						{
							strcpy(sss, data + t[i + 1].start);
							uint8_t data_Len = t[i + 1].end - t[i + 1].start;
							parsing(jSC.time.secs, sss, data_Len);
						}
						else
							if (jsoneq(data, &t[i], "Weather") == 0)
							{
								strcpy(sss, data + t[i + 1].start);
								uint8_t data_Len = t[i + 1].end - t[i + 1].start;
								parsing(jSC.time.weather, sss, data_Len);
							}
							else
								if (jsoneq(data, &t[i], "Index") == 0)
								{
									strcpy(sss, data + t[i + 1].start);
									uint8_t data_Len = t[i + 1].end - t[i + 1].start;
									parsing(jSC.user.index, sss, data_Len);
								}
								else
									if (jsoneq(data, &t[i], "CardID") == 0)
									{
										strcpy(sss, data + t[i + 1].start);
										uint8_t data_Len = t[i + 1].end - t[i + 1].start;
										parsing(jSC.user.cardID, sss, data_Len);
									}
									else
										if (jsoneq(data, &t[i], "Name") == 0)
										{
											strcpy(sss, data + t[i + 1].start);
											uint8_t data_Len = t[i + 1].end - t[i + 1].start;
											parsing(jSC.user.name, sss, data_Len);
										}
										else
											if (jsoneq(data, &t[i], "MSSV") == 0)
											{
												strcpy(sss, data + t[i + 1].start);
												uint8_t data_Len = t[i + 1].end - t[i + 1].start;
												parsing(jSC.user.mssv, sss, data_Len);
											}
	}
	return jSC;
}
/* End Json Define */

//===================convert data=================

uint16_t* ConvertCharToUint16(char *s) {
	uint8_t i;
	static uint16_t temp[31];
	ResetArr(temp,31);
	for(i=0; s[i]; i++) {
		temp[i]=s[i];
	}
	return temp;
}

char* ConvertUint16ToChar(uint16_t* s) {
	uint8_t i;
	static char temp[31];
	ResetArr((uint16_t*)temp,31);
	for(i=0; s[i]; i++) {
		temp[i]=s[i];
	}
	return temp;
}

char* ConvertUint8ToChar(uint8_t* s) {
	uint8_t i;
	static char temp[31];
	ResetArr((uint16_t*)temp,31);
	for(i=0; s[i]; i++) {
		temp[i]=s[i];
	}
	return temp;
}

uint8_t* ConvertCharToUint8(char *s) {
	uint8_t i;
	static uint8_t temp[31];
	ResetArr((uint16_t*)temp,31);
	for(i=0; s[i]; i++) {
		temp[i]=s[i];
	}
	return temp;
}

uint8_t* ConvertUint16ToUint8(uint16_t *s) {
	uint8_t i;
	static uint8_t temp[31];
	ResetArr((uint16_t*)temp,31);
	for(i=0; s[i]; i++) {
		temp[i]=s[i];
	}
	return temp;
}

char *Convert_Dec_To_String_Hex(uint8_t num) {
	static char ret[3];
	sprintf(ret,"%02X",num);
	return ret;
}

/*=================Read and Write page 0===============*/

//void Write_EmerFlag(uint16_t flag) {
//	//position 0 in page 0
//	User_FLASH_Write(flag,0,PAGE0);
//}
//void Updata_EmerFlag(void) {
//	//position 0 in page 0
//	Emer_flag=User_FLASH_Read(0,PAGE0);
//}

void Write_NbrID(uint16_t Nbr) {
	//position 1 in page 0
	User_FLASH_Write(Nbr,1,PAGE0);
}

void Updata_NbrID(void) {
	//position 1 in page 0
	Nbr_ID=User_FLASH_Read(1,PAGE0);
}

void Write_Page0(uint16_t Nbr) {
	User_FLASH_Erase(PAGE0);
	Write_NbrID(Nbr);
}

void Updata_Data_From_PAGE0() {
	Updata_NbrID();
}

void Display_PAGE0(void) {
	sprintf(TempBuff,"Nbr_ID:%d\n",Nbr_ID);
	User_USART2_SendSchar(TempBuff);
}

/*=================Read and Write page 1===============*/
void Add_ID (uint8_t* InID) {
	uint8_t i, j;
	if(Nbr_ID>=50) {
		User_USART2_SendSchar("\nDa du so luong ID khong the add them\n");
		return;
	}
	
	//case Nbr_ID=0
	if(Nbr_ID==0) {
		User_FLASH_Erase(PAGE1);
		for(i=0; i<5; i++) {
			User_FLASH_Write(InID[i],i, PAGE1);
		}
		return;
	}
	
	//backup data from page 1 to page 4 first
	User_FLASH_Erase(PAGE4);
	/*
	-	i: index of number of ID
	- j: index of IDi
	*/
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<5; j++) {
			User_FLASH_Write(User_FLASH_Read(i*5+j, PAGE1), i*5+j, PAGE4); //copy data from page 1 to page 4
		}
	}
	//start write old data (from page 4) and new data to page 1
	User_FLASH_Erase(PAGE1);
	//old data
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<5; j++) {
			User_FLASH_Write(User_FLASH_Read(i*5+j, PAGE4), i*5+j, PAGE1);
		}
	}
	//new data
	for(i=0; i<5; i++) {
		User_FLASH_Write(InID[i],Nbr_ID*5 + i, PAGE1);
	}
	/*-------------update nbr_id to flash (page0)---------------*/
//	Nbr_ID++;
//	Write_Page0(Emer_flag,Nbr_ID,OneTouch,password);
}

int8_t Search_ID (uint8_t* InID) {
	uint8_t i,j;
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<5; j++) {
			if(InID[j]!=User_FLASH_Read(i*5+j,PAGE1)) {
				break;
			}
		}
		if(j==5) { // phat hien ID dung
			return i;
		}
	}
	return ID_NOT_FOUND;
}

uint8_t* Pick_ID (uint8_t index){
	static uint8_t TempID[5];
	uint8_t i;
	if(index >= Nbr_ID) {
		User_USART2_SendSchar("\nChi so khong hop le\n");
		return NULL;
	}
	for(i=0; i<5; i++) {
		TempID[i]=User_FLASH_Read(index*5+i,PAGE1);
	}
	return TempID;
}

void Remove_ID (uint8_t index) {
	
	uint8_t i, j;
	if(index>=Nbr_ID) return;
	
	//in case: there's only one ID and pos need to remove is 0
	if(Nbr_ID==1 && index==0) {
		User_FLASH_Erase(PAGE1);
		return;
	}
	
	//backup data from page 1 to page 4 first
	User_FLASH_Erase(PAGE4);
	/*
	-	i: index of number of ID
	- j: index of IDi
	*/
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<5; j++) {
			User_FLASH_Write(User_FLASH_Read(i*5+j, PAGE1), i*5+j, PAGE4); //copy data from page 1 to page 4
		}
	}
	
	//start write old data from page 4 to page 1 BUT ignore ID index
	User_FLASH_Erase(PAGE1);
	//old data
	for(i=0; i<Nbr_ID-1; i++) {
		//if ID[index] found
		if(i==index) {
			for(i=i+1; i<Nbr_ID; i++) {
				for(j=0; j<5; j++) {
					User_FLASH_Write(User_FLASH_Read(i*5+j, PAGE4), (i-1)*5+j, PAGE1);
				}
			}
			break;
		}
		//if not found
		for(j=0; j<5; j++) {
			User_FLASH_Write(User_FLASH_Read(i*5+j, PAGE4), i*5+j, PAGE1);
		}
	}
	
	/*-------------update nbr_id to flash (page0)--------------*/
//	Nbr_ID--;
//	Write_Page0(Emer_flag,Nbr_ID,OneTouch,password);
}

/*=================Read and Write page 2===============*/
void Add_Name (uint8_t* InName) {
	uint8_t i, j;
	if(Nbr_ID>=50) {
		User_USART2_SendSchar("\nDa du so luong Name khong the add them\n");
		return;
	}
	//case Nbr_ID=0
	if(Nbr_ID==0) {
		User_FLASH_Erase(PAGE2);
		for(i=0; i<10; i++) {
			User_FLASH_Write(InName[i],i, PAGE2);
		}
		return;
	}
	//backup data from page 2 to page 4 first
	User_FLASH_Erase(PAGE4);
	/*
	-	i: index of number of Name
	- j: index of Namei
	*/
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<10; j++) {
			User_FLASH_Write(User_FLASH_Read(i*10+j, PAGE2), i*10+j, PAGE4); //copy data from page 2 to page 4
		}
	}
	//start write old data (from page 4) and new data to page 2
	User_FLASH_Erase(PAGE2);
	//old data
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<10; j++) {
			User_FLASH_Write(User_FLASH_Read(i*10+j, PAGE4), i*10+j, PAGE2);
		}
	}
	//new data
	for(i=0; i<10; i++) {
		User_FLASH_Write(InName[i],Nbr_ID*10 + i, PAGE2);
	}
	/*-------------update nbr_id to flash (page0)---------------*/
//	Nbr_ID++;
//	Write_Page0(Emer_flag,Nbr_ID,OneTouch,password);
}
int8_t Search_Name (uint8_t* InName) {
	uint8_t i,j;
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<10; j++) {
			if(InName[j]!=User_FLASH_Read(i*10+j,PAGE2)) {
				break;
			}
		}
		if(j==10) { // phat hien Name dung
			return i;
		}
	}
	return -1;
}

uint8_t* Pick_Name (uint8_t index){
	static uint8_t TempName[10];
	uint8_t i;
	if(index >= Nbr_ID) {
		User_USART2_SendSchar("\nChi so khong hop le\n");
		return NULL;
	}
	for(i=0; i<10; i++) {
		TempName[i]=User_FLASH_Read(index*10+i,PAGE2);
	}
	return TempName;
}

void Remove_Name (uint8_t index) {
	
	uint8_t i, j;
	if(index>=Nbr_ID) return;
	//in case: there's only one ID and pos need to remove is 0
	if(Nbr_ID==1 && index==0) {
		User_FLASH_Erase(PAGE2);
		return;
	}
	//backup data from page 2 to page 4 first
	User_FLASH_Erase(PAGE4);
	/*
	-	i: index of number of Name
	- j: index of Namei
	*/
	for(i=0; i<Nbr_ID; i++) {
		for(j=0; j<10; j++) {
			User_FLASH_Write(User_FLASH_Read(i*10+j, PAGE2), i*10+j, PAGE4); //copy data from page 2 to page 4
		}
	}
	
	//start write old data from page 4 to page 2 BUT ignore Name index
	User_FLASH_Erase(PAGE2);
	//old data
	for(i=0; i<Nbr_ID-1; i++) {
		//if Name[index] found
		if(i==index) {
			for(i=i+1; i<Nbr_ID; i++) {
				for(j=0; j<10; j++) {
					User_FLASH_Write(User_FLASH_Read(i*10+j, PAGE4), (i-1)*10+j, PAGE2);
				}
			}
			break;
		}
		//if not found
		for(j=0; j<10; j++) {
			User_FLASH_Write(User_FLASH_Read(i*10+j, PAGE4), i*10+j, PAGE2);
		}
	}
	
	/*-------------update nbr_id to flash (page0)---------------*/
//	Nbr_ID--;
//	Write_Page0(Emer_flag,Nbr_ID,OneTouch,password);
}

/*=================Read and Write page 3===============*/


	
/*-------------update nbr_id to flash (page0)---------------*/


void Add_NewMem(uint8_t* InID,uint8_t* InName) { // Add member final - 1
	if(Nbr_ID>=50) {
		User_USART2_SendSchar("\nDa du so luong luong, khong the add them\n");
		return;
	}
	Add_ID(InID);
	Add_Name(InName);
	//update new Nbr_ID
	Nbr_ID++;
	Write_Page0(Nbr_ID);
}

void Remove_Mem(uint8_t index) {	//Remove member final - 2
	if(index>=Nbr_ID) {
		User_USART2_SendSchar("\nChi so khong hop le!\n");
		return;
	}
	Remove_ID(index);
	Remove_Name(index);
	Nbr_ID--;
	Write_Page0(Nbr_ID);
}

void Display_ID(uint8_t index) {
	if(index>=Nbr_ID) {
		User_USART2_SendSchar ("\nchi so khong hop le!\n");
		return;
	}
	sprintf(TempBuff,"[%d].",index);
	User_USART2_SendSchar(TempBuff);
	uint8_t* temp=NULL;
	User_USART2_SendSchar("\nMa the:");
	temp=Pick_ID(index);
	sprintf(TempBuff,"[%02X,%02X,%02X,%02X,%02X]\n",temp[0],temp[1],temp[2],temp[3],temp[4]);
	User_USART2_SendSchar(TempBuff);
	sprintf(TempBuff,"Ten: %s\n",ConvertUint8ToChar(Pick_Name(index)));
	User_USART2_SendSchar(TempBuff);

}




void ResetArr(uint16_t* arr, uint8_t leng) {
	int i;
	for(i=0;i<30; i++) {
		arr[i]=0x0000;
	}
}





//uint8_t CheckAlert (void) {
//	if (Emer_flag) return Emer_flag;
//	if((Door_status==CLOSE) && (CheckDoorStatus()==OPEN)) { //if door is close but switch indicate open
//		uint8_t i=0;
//		for(i=0; i<5; i++) {
//			DelayMs(100);
//			if (!((Door_status==CLOSE) && (CheckDoorStatus()==OPEN))) { //noisy cause
//				return Emer_flag;
//			}
//		}
//		Emer_flag=TRUE;
//		Write_Page0(Emer_flag,Nbr_ID,OneTouch);
//	}
//	return Emer_flag;
//}

uint8_t CheckDoorStatus(void) {
	if(!Read_status(GPIOB,SWITCH_Pin)) {
		return CLOSE;
	}
	else
		return OPEN;
}

uint8_t CheckScanedID(uint8_t* IDCheck) {
	if(Search_ID(IDCheck)==ID_NOT_FOUND)
		return FALSE;
	else 
		return TRUE;
}

void DisplayMenu(void) {
	User_USART2_SendSchar("\nm: Hien thi menu\n");
	User_USART2_SendSchar("d: Mo cua\n");
	User_USART2_SendSchar("a: Them thanh vien\n");
	User_USART2_SendSchar("r: Loai bo thanh vien\n");
	User_USART2_SendSchar("p: Doi password\n");
	User_USART2_SendSchar("o: Che do mot cham\n");
	User_USART2_SendSchar("x: Tat bao dong\n");
}

void Add_Mem_Procedure(void) {
	uint8_t i;
	uint8_t NameR[10];
	
	uint16_t* ReceiveTemp=NULL;
	User_USART2_SendSchar("\nAdd memeber\n");
	
	IWDG_ReloadCounter();
	User_USART2_SendSchar("\nVui long dua the lai gan may quet\n");
	while(TM_MFRC522_Check(ScanedID) == MI_ERR);
	User_USART2_SendSchar("\nDa nhan duoc the\n");
	if(CheckScanedID(ScanedID)) {//ID ton tai
		User_USART2_SendSchar("\nID da ton tai\n");
		return;
	}
	//====================receive & assign for Name=============
	IWDG_ReloadCounter();
	User_USART2_SendSchar("\nNhap ten(ket thuc bang dau '.'): ");
	ReceiveTemp=User_USART2_ReceiveString2('.',9);
	for(i=0; i<10; i++) {
		NameR[i]=ReceiveTemp[i];
	}
	//====================receive & assign for MSSV=============
	
	Add_NewMem(ScanedID,NameR);
	User_USART2_SendSchar("\nThem thanh vien thanh cong\n");
	
}

void Parse(void) {
	//Display_watch("15", "16", "17", "weather");
	char *uartData = ConvertUint16ToChar((uint16_t*)buff);
	User_USART2_SendSchar(uartData);
		//====================receive & assign for Name=============
	IWDG_ReloadCounter();
	JsonIN_V dataIN;
	dataIN = ParseJson(uartData);
	
	if (dataIN.type[0] == '0')
	{
		Display_watch(dataIN.time.hours, dataIN.time.mins, dataIN.time.secs, dataIN.time.weather);
	}
	else 
	{
		if (dataIN.type[0] == '4')
		{
			Display_Func(dataIN.user.index[0]);
			DelayMs(2000);
			checkDisplay = 1;
		}
	}
}

void Remove_Mem_Procedure(void) {
	if(Nbr_ID<=0) {
		User_USART2_SendSchar("\nSo luong thanh vien hien la 0\n");
		return;
	}
	uint8_t i;
	User_USART2_SendSchar("\nRemove memeber\n");
	
		IWDG_ReloadCounter();
		for(i=0; i<Nbr_ID; i++) {
			Display_ID(i);
		}
		User_USART2_SendSchar("\nChon thanh vien can loai bo (ket thuc bang dau '.'): ");
		User_USART2_ReceiveString(TempBuff,'.',10);
		if(atoi(TempBuff)<0 || atoi(TempBuff)>=Nbr_ID) {
			User_USART2_SendSchar("\nMa thanh vien khong hop le\n");
		}
		else {
			Remove_Mem(atoi(TempBuff));
			User_USART2_SendSchar("\nDa loai bo thanh vien\n");
		}
	
}

uint8_t CompareUintChar(uint16_t* s1, char* s2, uint8_t leng) {
	uint8_t i;
	for (i=0 ; i<leng ; i++) {
		if(s1[i]!=s2[i])
			return FALSE;
	}
	return TRUE;
}

//for interrupt receive usart2==============

void USART2_IRQHandler(void){
	//get data when ever receive interrupt excuse and receive_flag for receive string
	if((USART_GetITStatus(User_USART2, USART_IT_RXNE) != RESET) ) {
		buff[buff_pos++] = User_USART2_ReceiveChar();
	}
	if(User_USART2_ReceiveChar()== '}')
	{
		Parse_flag = TRUE;
		buff_pos = 0;
	}
}


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


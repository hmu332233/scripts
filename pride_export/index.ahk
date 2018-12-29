insert:: ; 시작키는 insert
CoordMode, Mouse, Screen ; 좌표를 스크린 기준으로만

MouseClick, left, 110, 282 ; 엑셀의 첫번째 좌표
sleep 500
send ^c ; ctrl c
sleep 500
MouseClick, left, 211, 745 ; 인터넷으로 가기
sleep 500
MouseClick, left, 218, 270 ; 계약번호 입력 클릭하기
sleep 500
send ^a ; ctrl a
sleep 500
send ^v ; ctrl v
; 조회 클릭하기
; 선택 클릭하기
; 미리보기 클릭하기
; 아니요 클릭하기
; 저장 아이콘 클릭하기
; 파일 형식 클릭하기
; pdf 클릭하기
; 확인 클릭하기
; 저장 화살표 클릭하기
; 다른 이름으로 저장 클릭하기
; ctrl v
; 저장 클릭하기
; 닫기 클릭하기
; 닫기 아이콘 클릭하기
; 엑셀 클릭하기
; 엑셀 한칸 내리기 클릭하기
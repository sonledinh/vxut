/*
	TRUONG DAI HOC CONG NGHE VAN XUAN
	TUYEN SINH DAI HOC 2020
	CODER: WSOFT9773@GMAIL.COM
*/

new WOW().init();

$(document).ready(function () {

    if ($(window).innerWidth() >= 768) {
        $(window).scroll(function () { // load image xettuyen
            if ($(window).scrollTop() >= 1000) {
                $('.xettuyen-desk').addClass('act');
            }
            else {
                $('.xettuyen-desk').removeClass('act');
            }
        });
    } else {
        $('.xettuyen-desk').removeClass('act');
    }

    $(window).scroll(function(){    // load entry button
        if ($(this).scrollTop() > $(document).height() - $(window).height() - 900 || $(this).scrollTop() < 2000) {
          $('.entry').fadeOut();
        }
        else {
            $('.entry').fadeIn();
        }
    });
    $(function() {
        $(document).ready(function(){ // cover box
            $(".cover_boxes2 ul li").hover(function(){
                  $('.cover_boxes2 ul li').removeClass('act');
                  $(this).addClass('act');
              });
              $(".cover_boxes ul li").hover(function(){
                  $('.cover_boxes ul li').removeClass('act');
                  $(this).addClass('act');
                });
          });
    });
     $(window).scroll(function(){ // scroll page
        if ($(this).scrollTop() > 1000) {
            $('#back_to_top').fadeIn();
        } else {
            $('#back_to_top').fadeOut();
        }
    });
    $('#back_to_top').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    if($(window).innerWidth() >= 1024){ //load hover sinhvien
      $(function(){
          $('.list-blog .col-md-3 .avarta').hover(function() {
              $('.list-blog .col-md-3').addClass('hover');
            }, function() {
              $('.list-blog .col-md-3').removeClass('hover');
          })
      })

      $(function(){
          $('.list-blog .item').hover(function() {
              $(this).next('.list-blog .item').addClass('hide-hv');
            }, function() {
              $(this).next('.list-blog .item').removeClass('hide-hv');
          })
      })

      $(function(){
          $('.list-blog .item:nth-child(4n)').hover(function() {
              $(this).next('.list-blog .item').removeClass('hide-hv');
              $(this).prev('.list-blog .item').addClass('cir-rad');
            }, function() {
              $(this).prev('.list-blog .item').removeClass('cir-rad');
          })
        })
    }

    /*Title h2 bg_white*/
    jQuery(function($) {
        var text_effect = function() {
            var offset = $(window).scrollTop() + $(window).height(),
                $animatables = $('.title h2');
            if ($animatables.length == 0) {
                $(window).off('scroll', text_effect);
            }
            $animatables.each(function(i) {
                var $animatable = $(this);
                if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                  $animatable.removeClass('animatable').addClass('animated');
                }
              });
          };

          $(window).on('scroll', text_effect);
          $(window).trigger('scroll');
    });
});

/*tracuuketqua --- manh 20200819*/
//start
function waitingid() {
    var waiting = document.getElementById("waiting");  //Goi Id anh gif
    waiting.style.display = 'block';  // Hien thi anh gif
    
    if ($("#txtName").val() === "") {  // Du lieu trong
        setTimeout(function(){
            $("#waiting").fadeOut(500);
            alert("Vui lòng nhập Họ và Tên");  // Thong bao loi
        }, 200)
        return;
    }

    if ($("#txtName").val().length < 4 || $("#txtName").val().length > 50) { // Ten < 4 ky tu va lon hon 50 ky tu
      setTimeout(function(){
            $("#waiting").fadeOut(500);
            alert("Họ và Tên của bạn chưa chính xác");  // Thong bao loi
        }, 200)
        return;
    }
    
    if ( $("#txtNgaySinhDay").val() >= 30 &&  $("#txtNgaySinhMonth").val() == 2 ) {  // Thang 2 khong co ngay 30 va 31
    	setTimeout(function(){
            $("#waiting").fadeOut(500);
            alert("Ngày sinh của bạn không chính xác, vui lòng chọn lại"); //Thong bao loi
        }, 200)
        return;
    }
       
    var txtName = $("#txtName").val(); //Nhap ten tu form
    
    txtName = txtName.toLowerCase()   //Doi chu cai dau thanh chu in hoa
	    .split(' ') //Lay du lieu sau dau ngoac
	    .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //Chu cai dau in hoa
	    .join(' ') // Noi dau cach
	    .replace(/\s\s+/g, ' ')// Loai bo nhieu dau cach o giua cau
	    .replace(/\s+$/, '');  //Loai bo dau cach sau cau
    
    var txtDate = $("#txtNgaySinhDay").val() + "/" + $("#txtNgaySinhMonth").val() + "/" + $("#txtNgaySinhYear").val();  //Du lieu nhap ngay thang nam sinh tu form
    
    $(document).ready(function() {
    
      $.ajax({
          type: "GET",
          url: "kqts.csv",   // Duong dan CSV file
          dataType: "text",
          success: function(data) {processData(data);}, // Doc file thanh cong
          error: function(data){						//Doc file khong thanh cong, File khong ton tai
          	setTimeout(function(){
	            $("#waiting").fadeOut(500);
	            alert("File không tồn tại, hoặc định dạng file lỗi. Vui lòng kiểm tra lại");
	        }, 200)
	        return;
      		}
      });
          
      function processData(data) {  // Khi sccess = true
      
          var lines = data.split(/\r\n|\n/); // Dem dong
          var HoTen = [];  // Goi Ho va Ten
          var Ngaysinh = [];   // Goi ngay sinh
          var dia_chi = [];    //Goi dia chi
          var Tohop_mon = [];  //To hop mon xet tuyen
          var Tong_diem = [];   //Tong diem
          var Nganh_xettuyen = []; //Nganh xet tuyen
          var ket_qua = [];    //giay bao ket qua
          
          var headings = lines[0].split(',');  // Gia tri header
          
          for (var j=1; j<lines.length; j++) {
            var values = lines[j].split(','); //lay cac gia tri trong lines
            
              HoTen = values[1]; //Du lieu ho va Ten
              Ngaysinh = values[2];  // Du lieu nganh sinh
              dia_chi = values[3]; // Du lieu dia chi
              Tohop_mon = values[4];  // Du lieu To hop mon
              Tong_diem = values[5];  // Du lieu tong diem
              Nganh_xettuyen = values[6];  // Du lieu nganh xet tuyen
              ket_qua = values[7];  // Du lieu link ket qua
            
              if ((HoTen == txtName) && (Ngaysinh == txtDate)) { // Truong hop Dung
              setTimeout(function(){   // Dua ra thong bao khi ket qua tra ve trung nhau
                    $("#waiting").fadeOut(500);
                  document.getElementById('thongbao').innerHTML = 
                      "<div class='container'>" +
                          "<div class=row>" +
                              "<div class='table-responsive'>" +
                                  "<table class='table content'>" +
                                      "<thead>" +
                                          "<tr>" +
                                              "<th scope='col'> Họ tên </th>" +
                                              "<th scope='col'> Ngày sinh </th>" +
                                              "<th scope='col'> Địa chỉ </th>" +
                                              "<th scope='col'> Tổ hợp môn xét tuyển </th>" +
                                              "<th scope='col'> Tổng Điểm </th>" +
                                              "<th scope='col'> Ngành xét tuyển </th>" +
                                              "<th scope='col'> Giấy báo kết quả </th>" +
                                          "</tr>" +
                                      "</thead>" +
                                      "<tbody>" +
                                          "<tr>" +
                                             "<td>" + HoTen + "</td>" + 
                                              "<td>" + Ngaysinh +"</td>" +
                                              "<td>" + dia_chi + "</td>" +
                                              "<td>"+ Tohop_mon + "</td>" +
                                              "<td>" + Tong_diem +"</td>" +
                                              "<td>"+ Nganh_xettuyen +"</td>" +
                                              "<td> <input target ='_blank' id='show_form' type='button' class='btn btn-primary' value='Xem' onclick='show_sv()'></td>" +
                                          "</tr>" +
                                      "</tbody>" +
                                  "</table>" +
                              "</div>" +
                          "</div>" +
                  "</div>";
                }, 500)
                break;  // ket thuc ket qua tim kiem
              }
            else{
                setTimeout(function(){ // Truong hop ket qua khong trung nhau.
                    $("#waiting").fadeOut(500);
                      document.getElementById('thongbao').innerHTML = "Chào bạn " + txtName + "<br> Dữ liệu của bạn không có trong hệ thống <br> Vui lòng liên hệ theo số điện thoại 0969 199 722 <br> Để được biết thêm chi tiết";
                }, 500)
                
            }
         } 
      }
   })
};
//end
/*show form*/
function show_sv() {
    var waiting = document.getElementById("waiting");  //Goi Id anh gif
    waiting.style.display = 'block';  // Hien thi anh gif

    var txtName = $("#txtName").val(); //Nhap ten tu form

    txtName = txtName.toLowerCase()   //Doi chu cai dau thanh chu in hoa
        .split(' ') //Lay du lieu sau dau ngoac
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1)) //Chu cai dau in hoa
        .join(' ') // Noi dau cach
        .replace(/\s\s+/g, ' ')// Loai bo nhieu dau cach o giua cau
        .replace(/\s+$/, '');  //Loai bo dau cach sau cau

    var txtDate = $("#txtNgaySinhDay").val() + "/" + $("#txtNgaySinhMonth").val() + "/" + $("#txtNgaySinhYear").val();  //Du lieu nhap ngay thang nam sinh tu form

    $(document).ready(function () {

        $.ajax({
            type: "GET",
            url: "kqts.csv",   // Duong dan CSV file
            dataType: "text",
            success: function (data) { processData(data); }, // Doc file thanh cong
            error: function (data) {						//Doc file khong thanh cong, File khong ton tai
                setTimeout(function () {
                    $("#waiting").fadeOut(500);
                    alert("File không tồn tại, hoặc định dạng file lỗi. Vui lòng kiểm tra lại");
                }, 200)
                return;
            }
        });

        function processData(data) {  // Khi sccess = true

            var lines = data.split(/\r\n|\n/); // Dem dong
            var HoTen = [];  // Goi Ho va Ten
            var Ngaysinh = [];   // Goi ngay sinh
            var Tong_diem = [];   //Tong diem
            var Nganh_xettuyen = []; //Nganh xet tuyen
            var Hinh_thuc = []; //Nganh xet tuyen

            var headings = lines[0].split(',');  // Gia tri header

            for (var j = 1; j < lines.length; j++) {
                var values = lines[j].split(','); //lay cac gia tri trong lines

                HoTen = values[1]; //Du lieu ho va Ten
                Ngaysinh = values[2];  // Du lieu nganh sinh
                Tohop_mon = values[4];  // Du lieu To hop mon
                Tong_diem = values[5];  //Tong diem
                Nganh_xettuyen = values[6];  // Du lieu nganh xet tuyen
                Hinh_thuc = values[7]

                if ((HoTen == txtName) && (Ngaysinh == txtDate)) { // Truong hop Dung
                    setTimeout(function () {
                        $("#waiting").fadeOut(500);
                        document.getElementById('post').style.display = "Block";
                        document.getElementById('text_hoten').innerHTML = "Anh/chị:" + " <p class='font-weight-bold pd_left'> " + HoTen + "</p>";
                        document.getElementById('text_ngaysinh').innerHTML = "Ngày sinh:" + " <p class='font-weight-bold pd_left'> " + Ngaysinh + "</p>";
                        document.getElementById('text_diemthi').innerHTML = "Điểm xét tuyển:" + " <p class='font-weight-bold pd_left'> " + Tong_diem + "</p>";
                        document.getElementById('text_hinhthuc').innerHTML = "Theo hình thức:" + " <p class='font-weight-bold pd_left'> " + Hinh_thuc + "</p>";
                        document.getElementById('text_nganh').innerHTML = " <p class='font-weight-bold pd_left'> " + Nganh_xettuyen + "</p>";

                        // document.getElementsByClassName("bg-fix")[0].style.display = "none";
                        // document.getElementById('txt_top').style.display = "none";
                        // document.getElementById('top').style.display = "none";
                        // document.getElementById('contribution').style.display = "none";
                        // document.getElementById('loiich').style.display = "none";
                        // document.getElementById('quyenloi').style.display = "none";
                        // document.getElementById('chitieu').style.display = "none";
                        // document.getElementById('pt_ts').style.display = "none";
                        // document.getElementById('recruit').style.display = "none";
                        // document.getElementById('hp_hb').style.display = "none";
                        // document.getElementById('wpb_wrapper').style.display = "none";
                        // document.getElementById('box-blog').style.display = "none";
                        // document.getElementById('api').style.display = "none";
                        // document.getElementById('tracuu').style.display = "none";
                        // document.getElementById('footer').style.display = "none";
                        
                    }, 200)
                    return;
                    


                }
                
            }
        }
    });

    $('.clc-popup').click();
};


/*Khi ket thuc mua tuyen sinh*/
// start
var current = new Date();  // thoi gian hien tai
var month = current.getMonth();  // Thang hien tai
if((month < 5) || (month > 12)){  // thang < 5 hoac > 12 thi layout tra cuu khong hien thi
	document.getElementById("tracuu").style.display = "none";
}
// End

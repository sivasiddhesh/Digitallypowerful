﻿
function login_influencer() {
    var id = getCookie("Id");
    var SocialTemp_count = 0;
    if (id > 0) {
        $.ajax({
            method: "GET",
            data: {
                userId: id
            },
            url: "/Api/Influencer/influencerprofile",
            success: function (data) {
                if (data.length > 0) {
                    $("#ProfileLogoName").html("Welcome back " + data[0].firstName + " !");
                    $("#ProfileName").html("Influencer");
                    $("#FirstName").val(data[0].firstName);
                    $("#LastName").val(data[0].lastName);
                    $("#Email").val(data[0].emailAddress);
                    $("#Mobile").val(data[0].phoneNumber);
                    $("#BirthDate").val((new Date(data[0].dob)).toISOString().substr(0, 10));
                    if (data[0].gender == "Female")
                        $("#Female").prop("checked", true);
                    else if (data[0].gender == "Male")
                        $("#Male").prop("checked", true);
                    else if (data[0].gender == "Transgender")
                        $("#Transgender").prop("checked", true);
                    else
                        $("#PreferNotToSay").prop("checked", true);
                    if (data[0].socialMedia.length > 0) {
                        for (var a = 0; a < data[0].socialMedia.length; a++) {
                            if (data[0].socialMedia[a].socialMediaTypeName == "Instagram") {
                                $("#InstaLink").val(data[0].socialMedia[a].socialMediaLink);
                                $("#InstaCount").val(data[0].socialMedia[a].followersCount);
                                $("#InstaVal").val(data[0].socialMedia[a].countTypeId);
                            } else if (data[0].socialMedia[a].socialMediaTypeName == "YouTube") {
                                $("#YouTubeLink").val(data[0].socialMedia[a].socialMediaLink);
                                $("#YouTubeCount").val(data[0].socialMedia[a].followersCount);
                                $("#YouTubeVal").val(data[0].socialMedia[a].countTypeId);
                            } else if (data[0].socialMedia[a].socialMediaTypeName == "Facebook") {
                                $("#FBLink").val(data[0].socialMedia[a].socialMediaLink);
                                $("#FBCount").val(data[0].socialMedia[a].followersCount);
                                $("#FBVal").val(data[0].socialMedia[a].countTypeId);
                            } else if (data[0].socialMedia[a].socialMediaTypeName == "Twitter") {
                                $("#TwitterLink").val(data[0].socialMedia[a].socialMediaLink);
                                $("#TwitterCount").val(data[0].socialMedia[a].followersCount);
                                $("#TwitterVal").val(data[0].socialMedia[a].countTypeId);
                            } else {
                                $("#Socialnetwork_Add").click();
                                SocialTemp_count = SocialTemp_count + 1;
                                $("#OtherName" + SocialTemp_count).val(data[0].socialMedia[a].socialMediaTypeName);
                                $("#OtherLink" + SocialTemp_count).val(data[0].socialMedia[a].socialMediaLink);
                                $("#OtherCount" + SocialTemp_count).val(data[0].socialMedia[a].followersCount);
                                $("#OtherVal" + SocialTemp_count).val(data[0].socialMedia[a].countTypeId);
                            }
                        }
                    }
                } else {
                    deleteAllCookies();
                    window.location.href = "/user/login";
                }
            },
            error: function (data) {
                var content = {};
                content.message = "Unable to fetch details, Kindly try again!";
                content.title = 'Digitally Powerful';
                content.icon = 'fa fa-bell';
                $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
            }
        });
    }
}

var influencerMobile_change_flag = 0;

$("#Mobile").change(function () {
    influencerMobile_change_flag = 1;
});

var SocialMedia_count = 0;
//INFLUENCERS PROFILE
$("#Socialnetwork_Add").click(function () {
    SocialMedia_count = SocialMedia_count+1;
    var table = $('#SocialNetworkingTable');
    var tr = $('<tr></tr>');
    tr.append("<td style='padding:0px !important'><div class='form-group'><input type='text' id='OtherName" + SocialMedia_count +"' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group'><input id='OtherLink" + SocialMedia_count+"' type='url' class='form-control' required=''></div></td>")
    tr.append("<td><div class='form-group d-flex'><div class='input-group'><input type='number' id='OtherCount" + SocialMedia_count + "' class='form-control' aria-label='Text input with dropdown button'><div class='input-group-append'><select class='form-control' id='OtherVal" + SocialMedia_count + "'><option value='1'>K</option><option value='2'>M</option></select></div></div><span><button class='btn btn-round btn-icon btn-danger' id='deleteRow'><i class='fa fa-trash'></i></button></span></div></div></td>");
    $(table).find('tbody').append(tr);
});

$("#SocialNetworkingTable").on("click", "#deleteRow", function () {
    $(this).closest("tr").remove();
    SocialMedia_count = SocialMedia_count - 1;
});

$("#Influencer_save").click(function () {
    $('#Influencer_save').prop('disabled', true);
    if ($("#FirstName").val() != "" && $("#Mobile").val() != "" && $("#Email").val() != "") {
        if (influencerMobile_change_flag == 0 || validateMobile($("#Mobile").val())) {
            var gender = "";
            if ($('input[name=icon-input]:checked').val() == "Female") {
                gender = "Female";
            } else if ($('input[name=icon-input]:checked').val() == "Male") {
                gender = "Male";
            } else if ($('input[name=icon-input]:checked').val() == "Transgender") {
                gender = "Transgender";
            } else if ($('input[name=icon-input]:checked').val() == "PreferNotToSay") {
                gender = "PreferNotToSay";
            }
            var Social = [];
            Social.push({
                SocialMediaTypeName: "Instagram",
                SocialMediaLink: $("#InstaLink").val(),
                FollowersCount: $("#InstaCount").val(),
                CountTypeId: $("#InstaVal").val(),
                SocialMediaTypeId:1
            });
            Social.push({
                SocialMediaTypeName: "YouTube",
                SocialMediaLink: $("#YouTubeLink").val(),
                FollowersCount: $("#YouTubeCount").val(),
                CountTypeId: $("#YouTubeVal").val(),
                SocialMediaTypeId: 2
            });
            Social.push({
                SocialMediaTypeName: "Twitter",
                SocialMediaLink: $("#TwitterLink").val(),
                FollowersCount: $("#TwitterCount").val(),
                CountTypeId: $("#TwitterVal").val(),
                SocialMediaTypeId: 3
            });
            Social.push({
                SocialMediaTypeName: "Facebook",
                SocialMediaLink: $("#FBLink").val(),
                FollowersCount: $("#FBCount").val(),
                CountTypeId: $("#FBVal").val(),
                SocialMediaTypeId: 4
            });
            for (var a = 1; a <= SocialMedia_count; a++) {
                Social.push({
                    SocialMediaTypeName: $("#OtherName" + (a)).val(),
                    SocialMediaLink: $("#OtherLink" + (a)).val(),
                    FollowersCount: $("#OtherCount" + (a)).val(),
                    CountTypeId: $("#OtherVal" + (a)).val(),
                    SocialMediaTypeId: 5
                });
            }
            var mobilenumber = "";
            if (influencerMobile_change_flag == 1) {
                mobilenumber = $("#Mobile").val();
            }
            $.ajax({
                method: "POST",
                data: {
                    UserId: getCookie("Id"),
                    EmailAddress: $("#Email").val(),
                    Gender: gender,
                    FirstName: $("#FirstName").val(),
                    LastName: $("#LastName").val(),
                    DateOfBirth: $("#BirthDate").val(),
                    PhoneNumber: mobilenumber,
                    SocialMedia: Social
                },
                url: "/Api/Influencer/influencerprofile",
                success: function (data) {
                    $('#Influencer_save').prop('disabled', false);
                    if (data.message == "Saved Successfully") {
                        var content = {};
                        content.message = data.message;
                        content.title = 'Digitally Powerful';
                        content.icon = 'fa fa-bell';
                        $.notify(content, { type: "success", placement: { from: "top", align: "right" }, });
                    }
                },
                error: function (data) {
                    $('#Influencer_save').prop('disabled', false);
                    var content = {};
                    content.message = "Kindly try again later";
                    content.title = 'Digitally Powerful';
                    content.icon = 'fa fa-bell';
                    $.notify(content, { type: "error", placement: { from: "top", align: "right" }, });
                }
            });
        } else {
            $("#Mobile").val("");
            $("#Mobile").css('border-color', 'red');
            $('#Influencer_save').prop('disabled', false);
            var content = {};
            content.message = "Kindly fill the 10 digit number";
            content.title = 'Cars Notification';
            content.icon = 'fa fa-bell';
            $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
        }
    }else {
        $('#Influencer_save').prop('disabled', false);
        $("#FirstName").val() == "" ? $("#FirstName").css('border-color', 'red') : $("#FirstName").css('border-color', '');
        $("#Mobile").val() == "" ? $("#Mobile").css('border-color', 'red') : $("#Mobile").css('border-color', '');
        $("#Email").val() == "" ? $("#Email").css('border-color', 'red') : $("#Email").css('border-color', '');
        var content = {};
        content.message = "Kindly fill the details";
        content.title = 'Cars Notification';
        content.icon = 'fa fa-bell';
        $.notify(content, { type: "warning", placement: { from: "top", align: "right" }, });
    }
});

$("#Influencer_cancel").click(function () {
    login_influencer();
    $("#FirstName").val() == "" ? $("#FirstName").css('border-color', 'red') : $("#FirstName").css('border-color', '');
    $("#Mobile").val() == "" ? $("#Mobile").css('border-color', 'red') : $("#Mobile").css('border-color', '');
    $("#Email").val() == "" ? $("#Email").css('border-color', 'red') : $("#Email").css('border-color', '');
});


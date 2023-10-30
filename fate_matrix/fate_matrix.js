$(document).ready(function () {
    $("#FormCalc input[name=date]").inputmask("99.99.9999");


    $("#FormCalc input[name=date]").keyup(function (e) {
        var id = $(this).attr("id");
        var value = $(this).val();
        if (value.length > 0) {
            $("label[for=" + id + "]").hide();
        } else {
            $("label[for=" + id + "]").show();
        }
    });

    $("#FormCalc").submit(function (e) {
        e.preventDefault();


        var value = $("#FormCalc input[name=date]").val();
        if (value.length == 0) {
            $("#FormCalc input[name=date]").addClass("is-invalid");
            return;
        } else {
            $("#FormCalc input[name=date]").removeClass("is-invalid");
        }


        var arr;
        var dateOfBirth = $(this).find("input[name=date]").val();


        var strDate = dateOfBirth + "";
        var aDate = strDate.split('.');
        if (aDate.length != 3) {
            alert("Не верный формат даты! Пример: 01.01.2020");
        }
        var nDay = parseInt(aDate[0]);
        var nMonth = parseInt(aDate[1]);
        var nYear = parseInt(aDate[2]);
        var day = nDay + "";
        if (nDay < 10) {
            day = "0" + day;
        }
        var month = nMonth + "";

        // Первая точка (фиолетовый круг, в примере цифра 21)
        // #point_01
        // Это дата рождения с 1 до 22, если больше 22 – то есть: 23 – это 2+3 = 5 – вписывается цифра 5 и т.д.
        var point_01 = fixedNumberForRange(nDay, 22);
        $("#point_01").html(point_01);

        // Вторая точка (фиолетовый круг, в примере цифра 10)
        // #point_02
        // Это месяц рождения с 1 до 12
        var point_02 = nMonth;
        $("#point_02").html(point_02);

        // Третья точка (красный круг, в примере цифра 7)
        // #point_03
        // Это год рождения, вычисляется путем сложения:
        // В нашем примере 1987 – то есть 1+ 9 + 8 + 7 = 25 и полученную цифру складываем пока не получится цифра в диапазоне от 1 до 22 включительно!
        var point_03 = 0;
        var sYear = nYear.toString();
        for (let i = 0; i < sYear.length; i++) {
            point_03 += parseInt(sYear[i]);
        }
        point_03 = fixedNumberForRange(point_03, 22);
        $("#point_03").html(point_03);

        // Четвертая точка (красный круг, в примере цифра 11)
        // #point_04
        // Это сложение первых трех точек
        // В нашем примере это: 21+10+7 = 38, получилась цифра большее 22 - поэтому далее сводим путем сложения пока не получится цифра в диапазоне от 1 до 22: 3+8 = 11
        var point_04 = parseInt(point_01) + parseInt(point_02) + parseInt(point_03);
        point_04 = fixedNumberForRange(point_04, 22);
        $("#point_04").html(point_04);

        // Пятая точка (желтый круг по центру, в примере цифра 13)
        // #point_05
        // Это сложение первых четырех точек
        // В нашем примере это: 21+10+7+11 = 49, получилась цифра большее 22 - поэтому далее сводим путем сложения пока не получится цифра в диапазоне от 1 до 22: 4+9 = 13
        var point_05 = parseInt(point_01) + parseInt(point_02) + parseInt(point_03) + parseInt(point_04);
        ;
        point_05 = fixedNumberForRange(point_05, 22);
        $("#point_05").html(point_05);

        // Шестая точка (голубой круг, в примере цифра 5)
        // #point_06
        // Это сложение 2ой и 5ой точки
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_06 = parseInt(point_02) + parseInt(point_05);
        point_06 = fixedNumberForRange(point_06, 22);
        $("#point_06").html(point_06);

        // Седьмая точка (голубой круг, в примере цифра 7)
        // #point_07
        // Это сложение 1ой и 5ой точки
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_07 = parseInt(point_01) + parseInt(point_05);
        point_07 = fixedNumberForRange(point_07, 22);
        $("#point_07").html(point_07);

        // Восьмая точка (оранжевый круг, в примере цифра 20)
        // #point_08
        // Складываем пятую (#point_05) точку и третью точку (#point_03)
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_08 = parseInt(point_05) + parseInt(point_03);
        point_08 = fixedNumberForRange(point_08, 22);
        $("#point_08").html(point_08);

        // Девятая точка – (оранжевый круг, в примере цифра 6)
        // #point_09
        // Складываем пятую (#point_05) точку и четвертую точку (#point_04)
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_09 = parseInt(point_05) + parseInt(point_04);
        point_09 = fixedNumberForRange(point_09, 22);
        $("#point_09").html(point_09);

        // Десятая точка (бесцветный круг, в примере цифра 8)
        // #point_10
        // Складываем точку #point_08 и точку #point_09
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_10 = parseInt(point_08) + parseInt(point_09);
        point_10 = fixedNumberForRange(point_10, 22);
        $("#point_10").html(point_10);

        // Одиннадцатая точка (бесцветный круг, в примере цифра 10)
        // #point_11
        // Складываем точку #point_08 и точку #point_10
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_11 = parseInt(point_08) + parseInt(point_10);
        point_11 = fixedNumberForRange(point_11, 22);
        $("#point_11").html(point_11);

        // Двенадцатая точка – (оранжевый круг, в примере цифра 14)
        // #point_12
        // Складываем точку #point_09 и точку #point_10
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_12 = parseInt(point_09) + parseInt(point_10);
        point_12 = fixedNumberForRange(point_12, 22);
        $("#point_12").html(point_12);

        // Тринадцатая точка (бесцветный круг, в примере цифра 17)
        // #point_13
        // Складываем четвертую точку и девятую точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_13 = parseInt(point_04) + parseInt(point_09);
        point_13 = fixedNumberForRange(point_13, 22);
        $("#point_13").html(point_13);

        // Четырнадцатая точка (синий круг, в примере цифра 15)
        // #point_14
        // Складываем вторую точку и шестую
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_14 = parseInt(point_02) + parseInt(point_06);
        point_14 = fixedNumberForRange(point_14, 22);
        $("#point_14").html(point_14);

        // Пятнадцатая точка – (синий круг, в примере цифра 10)
        // #point_15
        // Складываем первую и седьмую точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_15 = parseInt(point_01) + parseInt(point_07);
        point_15 = fixedNumberForRange(point_15, 22);
        $("#point_15").html(point_15);

        // Шестнадцатая точка (зеленый круг, в примере цифра 18)
        // #point_16
        // Складываем пятую центральную точку и шестую
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_16 = parseInt(point_05) + parseInt(point_06);
        point_16 = fixedNumberForRange(point_16, 22);
        $("#point_16").html(point_16);

        // Семнадцатая точка (зеленый круг, в примере цифра 20)
        // #point_17
        // Складываем пятую центральную точку и седьмую
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_17 = parseInt(point_05) + parseInt(point_07);
        point_17 = fixedNumberForRange(point_17, 22);
        $("#point_17").html(point_17);

        // Восемнадцатая точка – (бесцветный круг, в примере цифра 4)
        // #point_18
        // Складываем первую и вторую точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_18 = parseInt(point_01) + parseInt(point_02);
        point_18 = fixedNumberForRange(point_18, 22);
        $("#point_18").html(point_18);

        // Девятнадцатая точка (бесцветный круг, в примере цифра 17)
        // #point_19
        // Складываем вторую и третью точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_19 = parseInt(point_02) + parseInt(point_03);
        point_19 = fixedNumberForRange(point_19, 22);
        $("#point_19").html(point_19);

        // Двадцатая точка (бесцветный круг, в примере цифра 18)
        // #point_20
        // Складываем третью и четвертую точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_20 = parseInt(point_03) + parseInt(point_04);
        point_20 = fixedNumberForRange(point_20, 22);
        $("#point_20").html(point_20);

        // Двадцать первая точка – (бесцветный круг, в примере цифра 5)
        // #point_21
        // Складываем первую и четвертую точку
        // Если полученная цифра больше 22, то её сводим путем сложения пока не получится цифра в диапазоне от 1 до 22
        var point_21 = parseInt(point_01) + parseInt(point_04);
        point_21 = fixedNumberForRange(point_21, 22);
        $("#point_21").html(point_21);


        // Предназначение для себя - Небо
        // #SpanDestinyMySky
        // Складываем вторую и четвертую точку
        var destinyMySky = parseInt(point_02) + parseInt(point_04);
        destinyMySky = fixedNumberForRange(destinyMySky);
        $("#SpanDestinyMySky").html(destinyMySky);

        // Предназначение для себя - Земля
        // #SpanDestinyMyEarth
        // Складываем первую и третью точку
        var destinyMyEarth = parseInt(point_01) + parseInt(point_03);
        destinyMyEarth = fixedNumberForRange(destinyMyEarth);
        $("#SpanDestinyMyEarth").html(destinyMyEarth);

        // Предназначение для себя
        // #SpanDestinyMySum
        // Складываем предназначение для себя по небу и предназначение для себя по земле
        var destinyMySum = parseInt(destinyMySky) + parseInt(destinyMyEarth);
        destinyMySum = fixedNumberForRange(destinyMySum, 22);
        $("#SpanDestinyMySum").html(destinyMySum);


        // Предназначение для социума - М
        // #SpanDestinySocietyM
        // Складываем 20 и 18 точки
        var destinySocietyM = parseInt(point_20) + parseInt(point_18);
        destinySocietyM = fixedNumberForRange(destinySocietyM);
        $("#SpanDestinySocietyM").html(destinySocietyM);

        // Предназначение для социума - Ж
        // #SpanDestinySocietyZh
        // Складываем 21 и 19 точки
        var destinySocietyZh = parseInt(point_21) + parseInt(point_19);
        destinySocietyZh = fixedNumberForRange(destinySocietyZh);
        $("#SpanDestinySocietyZh").html(destinySocietyZh);


        // Предназначение для социума
        // #SpanDestinySocietySum
        // складываем предназначение для социума М и предназначение для социума Ж
        var destinySocietySum = parseInt(destinySocietyM) + parseInt(destinySocietyZh);
        destinySocietySum = fixedNumberForRange(destinySocietySum, 22);
        $("#SpanDestinySocietySum").html(destinySocietySum);

        // Общее предназначение (в примере цифра 12)
        // Складываем предназначение для себя третье и предназначение для социума третье

        var destinyGeneral = parseInt(destinyMySum) + parseInt(destinySocietySum);
        destinyGeneral = fixedNumberForRange(destinyGeneral, 22);
        $("#SpanDestinyGeneral").html(destinyGeneral);


    });
});


function fixedNumberForRange(num, range = 22) {
    num = parseInt(num);
    range = parseInt(range);

    if (num > range) {
        var str = num.toString();
        return parseInt(str[0]) + parseInt(str[1]);
    } else {
        return num;
    }

}
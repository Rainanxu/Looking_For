//Version: 0.1.0


function start_file_load() {
    let file_E = document.getElementById('HTML_file_in');
    get_files(file_E, 0,true);
}
function start_file_loaded() {
    console.log('main HTML file loaded.')
    /*
    console.log(text_files[0]);
    let text_t=remove_data_or_exegesis_keep_line(text_files[0]);
    console.log(text_t);
    */
    console.log('main HTML file chacking...');
    chack_HTML_line_break_error();
    console.log('main HTML file chacking links...');
    get_link_list(text_files[0]);
    //console.log(HTML_main_file, link_list, script_list);
    files_list_step_style_load();
    console.log('main HTML file show links.');
    show_files_list();
}
function link_file_loaded(file_index_in,type_css){
    let list_index=file_index_in-1;
    let error_list=[];
    if(type_css){
        console.log("Loaded link file ["+link_list[list_index].url+"]");
        console.log("chacking link file...");
        error_list=chack_js_css_line_break_error(text_files[file_index_in],true);
        link_list[list_index].use=3;
        if(error_list.length!=0){
            link_list[list_index].use=4;
            link_list[list_index].error_line=error_list;
        }
        console.log('error line index',error_list);
    }
    else{
        list_index=list_index-link_list.length;
        console.log("Loaded link file ["+script_list[list_index].url+"]");
        console.log("chacking link file...");
        error_list=chack_js_css_line_break_error(text_files[file_index_in],false);
        script_list[list_index].use=3;
        if(error_list.length!=0){
            script_list[list_index].use=4;
            script_list[list_index].error_line=error_list;
        }
        console.log('error line index',error_list);
    }
    files_list_step_style_load();
    //console.log(text_files[file_index_in],file_index_in,type_css);
    return 0;
};
let code_url = "";
let chack_line = 0;
let chack_index = 0;
/*
function get_url() {
    let url = window.location.href;
    let url_part = url.split('/');
    let url_end = "";
    let number0 = 0;
    let Long = url_part.length - 2;
    for (; ;) {
        if (Long <= number0) break;
        url_end = url_end + url_part[number0] + '/';
    }
    url_end = url_end + 'Code';
    code_url = url_end;
    return 0;
}*/
let files_index = 0;
let files_type_in=0;
let text_files = [];
let file_temp="";
function get_files(file, file_in_index = -1,main_file=false,type_css=false) {
    let F_E = file;
    let F_I_E = document.getElementById('output_i');
    F_I_E.innerHTML = 'Loading';
    let F_R;
    if (file_in_index == -1) {
        file_in_index = files_index;
    }
    if (F_E.files[0]) {
        F_R = new FileReader();
        F_R.readAsText(F_E.files[0], 'utf-8');
        F_R.onload = function () {
            file_temp=this.result;
            //F_I_E.className = 'output_i output_i_s';
            F_I_E.innerHTML = 'Loaded';
            if(main_file){
                text_files=[];
                text_files[0]=file_temp;
                HTML_main_file_use=1;
                start_file_loaded();
            }
            else{
                text_files[file_in_index]=file_temp;
                link_file_loaded(file_in_index,type_css);
            }
        }
    }
    else {
        //F_I_E.className = 'output_i output_i_f';
        F_I_E.innerHTML = 'Load fall';
    }
    return 0;
}

function be_line(text_in) {
    let return_T = "";
    return_T = text_in.split('/\r\n/');
    return return_T;
}
/*
function chack_data(text_in){
    let text_T=text_in;
    let RE_0=/['"]/;
    let RE_1=/[^'"]/g;
    let RE_2=/'["]{0,}'/;
    let RE_3=/"[']{0,}"/;
    let number0=0,number1=-1;
    if(RE_0.test(text_T)){
        text_T=text_T.replace(RE_1,'');
        for(;;){
            number0=text_T.length;
            if(number0==0)return false;
            if(number0==number1)return true;
            number1=number0;
            text_T=text_T.replace(RE_2,'');
            text_T=text_T.replace(RE_3,'');
        }
    }
    return false;
}
    */
function chack_in_data_or_exegesis(text_in) {
    let text_T = text_in;
    let RE_0 = /("([^"\r\n]){0,}")|('([^'\r\n]){0,}')/;
    let RE_1 = /(\/\/([^\r\n]){0,})|(\/\*([\s\S]){0,}?\*\/)/;
    let RE_2 = /<!--([\s\S]){0,}?-->/;
    let RE_0_1 = /(")|(')/;
    let RE_1_1 = /(\/\/)|(\/*)/;
    let RE_2_1 = /<!--/;
    //let number0 = 0, number1 = 0,number2=0;
    let V_T=[0,0,0];
    let R0=0,R1=1,R2=2,RT=0;
    let chack_A_R=[
        function(){
            V_T[0] = text_T.search(RE_0);
        },
        function(){
            V_T[1] = text_T.search(RE_1);
        },
        function(){
            V_T[2] = text_T.search(RE_2);
        }
    ];
    let remove_A_R=[
        function(){
            text_T = text_T.slice(V_T[0]);
            text_T = text_T.replace(RE_0, 'data');
        },
        function(){
            text_T = text_T.slice(V_T[1]);
            text_T = text_T.replace(RE_1, '');
        },
        function(){
            text_T = text_T.slice(V_T[2]);
            text_T = text_T.replace(RE_2, '');
        }
    ];
    function chack_A(index_in){
        remove_A_R[index_in]();
        chack_A_R[index_in]();
    }
    V_T[R0] = text_T.search(RE_0);
    V_T[R1] = text_T.search(RE_1);
    V_T[R2] = text_T.search(RE_2);
    for(;;){
        if(V_T[R1]<=V_T[R2]){
            RT=R2;
            R2=R1;
            R1=RT;
        }
        if(V_T[R0]<=V_T[R2]){
            RT=R2;
            R2=R0;
            R0=RT;
        }
        if(V_T[R2]==-1){
            for(;;){
                if(V_T[R0]<=V_T[R1]){
                    RT=R1;
                    R1=R0;
                    R0=RT;
                }
                if(V_T[R1]==-1){
                    for(;;){
                        if(V_T[R0]==-1)break;
                        chack_A(R0);
                    }
                    break;
                }
                chack_A(R1);
                chack_A_R[R0]();
            }
            break;
        }
        chack_A(R2);
        chack_A_R[R1]();
        chack_A_R[R0]();
    }
    R0 = text_T.search(RE_0_1);
    R1 = text_T.search(RE_1_1);
    R1 = text_T.search(RE_2_1);
    if(R0!=-1)return false;
    else if(R1!=-1)return false;
    else if(R2!=-1)return false;
    else return true;
}
function remove_data_or_exegesis_keep_line(text_in) {
    let text_T = text_in;
    let RE_0 = /("([^"\r\n]){0,}")|('([^'\r\n]){0,}')/;
    let RE_1 = /(\/\/([^\r\n]){0,})|(\/\*([\s\S]){0,}?\*\/)/;
    let RE_2 = /<!--([\s\S]){0,}?-->/;
    let line_temp="";
    let V_T=[0,0,0];
    let R0=0,R1=1,R2=2,RT=0;
    let chack_A_R=[
        function(){
            V_T[0] = text_T.search(RE_0);
        },
        function(){
            V_T[1] = text_T.search(RE_1);
        },
        function(){
            V_T[2] = text_T.search(RE_2);
        }
    ];
    let remove_A_R=[
        function(){
            text_T = text_T.replace(RE_0, 'data');
        },
        function(){
            line_temp=RE_1.exec(text_T)[0];
            line_temp=line_temp.replace(/[^ \r\n]/g,'');
            text_T = text_T.replace(RE_1, line_temp);
        },
        function(){
            line_temp=RE_2.exec(text_T)[0];
            line_temp=line_temp.replace(/[^ \r\n]/g,'');
            text_T = text_T.replace(RE_2, line_temp);
        }
    ];
    function chack_A(index_in){
        remove_A_R[index_in]();
        chack_A_R[index_in]();
    }
    V_T[R0] = text_T.search(RE_0);
    V_T[R1] = text_T.search(RE_1);
    V_T[R2] = text_T.search(RE_2);
    for(;;){
        if(V_T[R1]<=V_T[R2]){
            RT=R2;
            R2=R1;
            R1=RT;
        }
        if(V_T[R0]<=V_T[R2]){
            RT=R2;
            R2=R0;
            R0=RT;
        }
        if(V_T[R2]==-1){
            for(;;){
                if(V_T[R0]<=V_T[R1]){
                    RT=R1;
                    R1=R0;
                    R0=RT;
                }
                if(V_T[R1]==-1){
                    for(;;){
                        if(V_T[R0]==-1){
                            break;
                        }
                        chack_A(R0);
                    }
                    break;
                }
                chack_A(R1);
                chack_A_R[R0]();
            }
            break;
        }
        chack_A(R2);
        chack_A_R[R1]();
        chack_A_R[R0]();
    }
    return text_T;
}
let HTML_main_file = "";
let HTML_main_file_use=0;
let HTML_main_file_error_lines_script=[];
let HTML_main_file_error_lines_style=[];
let link_list = [
    {
        url: "",
        /*
        0 unload
        1 load
        2 keep
        3 pass
        4 error
        */
        use: 0,
        error_line:[]
    }
];
let script_list = [
    {
        url: "",
        /*
        0 unload
        1 load
        2 keep
        3 pass
        4 error
        */
        use: 0,
        error_line:[]
    }
];
let link_cut_in_code = "||--|Looking_For_LInK_cUt_In_||--|";
let script_cut_in_code = "||--|Looking_For_SCRIpT_cUt_In_||--|";
function get_link_list(text_in) {
    let list_cut_out_temp = []
    let cut_index = 0;
    let cut_reload_index = 0;
    let link_list_index = 0;
    let RE_link = /((<)|(\\x3C))link((\s){1,}((rel)|(type)|(href))(\s){0,}=(\s){0,}(('([^'\r\n]){0,}')|("([^"\r\n]){0,}"))){2,}(\s){0,}(\/){0,1}>/i;
    let RE_link_css = /(\s){1,}rel(\s){0,}=(\s){0,}(("( ){0,}stylesheet( ){0,}")|('( ){0,}stylesheet( ){0,}'))/i;
    let RE_link_css_url = /(\s){1,}href(\s){0,}=(\s){0,}(("([^\r\n]){0,}")|('([^\r\n]){0,}'))/i;
    let RE_link_css_utl_clean = /("([^\r\n]){0,}")|('([^\r\n]){0,}')/i;
    let RE_script = /((<)|(\\x3C))script((\s){1,}((type)|(src))(\s){0,}=(\s){0,}(('([^'\r\n]){0,}')|("([^"\r\n]){0,}"))){1,}((\s)){0,}>(\s){0,}((<)|(\\x3C))\/script>/i;
    let RE_script_utl = /(\s){1,}src(\s){0,}=(\s){0,}(("([^\r\n]){0,}")|('([^\r\n]){0,}'))/i;
    let RE_script_utl_clean = /("([^\r\n]){0,}")|('([^\r\n]){0,}')/i;
    let cut_in_temp = link_cut_in_code + "||--tEmP--cUt-|-|";
    let text_T = "";
    let number0 = 0, number1 = 0, number2 = 0;
    let temp0 = true, temp1 = 0;
    let HTML_main_file_T = text_in;
    link_list = [];
    // link
    for (; ;) {
        number0 = HTML_main_file_T.search(RE_link);
        if (number0 >= 0) {
            list_cut_out_temp[cut_index] = RE_link.exec(HTML_main_file_T)[0];
            number1 = list_cut_out_temp[cut_index].length;
            text_T = HTML_main_file_T.slice(number2, number0);
            temp0 = chack_in_data_or_exegesis(text_T);
            if (temp0) {
                //temp tag
                HTML_main_file_T = HTML_main_file_T.slice(0, number0) + cut_in_temp + HTML_main_file_T.slice(number1 + number0);
                cut_index++;
            }
            else {
                number2 = number0;
                temp1 = list_cut_out_temp[cut_index].search(RE_link_css);
                if (temp1 >= 0) {
                    //console.log('link true')
                    //console.log('ikkkkkkkkkkkkkkkkkk',RE_link_css_utl.exec(list_cut_out_temp[cut_index]),list_cut_out_temp,cut_index);
                    link_list[link_list_index] = { url: "", use: 0,error_line:[] };
                    link_list[link_list_index].url = RE_link_css_url.exec(list_cut_out_temp[cut_index]);
                    if (link_list[link_list_index].url !== null) {
                        link_list[link_list_index].url = link_list[link_list_index].url[0];
                        link_list[link_list_index].url = RE_link_css_utl_clean.exec(link_list[link_list_index].url)[0];
                        link_list[link_list_index].url = link_list[link_list_index].url.slice(1, -1);
                    }
                    else {
                        link_list[link_list_index].url = list_cut_out_temp[cut_index], link_list[link_list_index].use = 3;
                    }
                    link_list_index++;
                    //tag
                    HTML_main_file_T = HTML_main_file_T.slice(0, number0) + link_cut_in_code + HTML_main_file_T.slice(number1 + number0);
                }
                else {
                    //temp tag
                    HTML_main_file_T = HTML_main_file_T.slice(0, number0) + cut_in_temp + HTML_main_file_T.slice(number1 + number0);
                    cut_index++;
                }
            }
        }
        else {
            break;
        }
    }
    for (; ;) {
        if (cut_reload_index >= cut_index) break;
        HTML_main_file_T = HTML_main_file_T.replace(cut_in_temp, list_cut_out_temp[cut_reload_index]);
        cut_reload_index++;
    }
    //script
    list_cut_out_temp = [];
    script_list = [];
    cut_in_temp = script_cut_in_code + "||--tEmP--cUt-|-|";
    cut_index = 0, cut_reload_index = 0, link_list_index = 0;
    number2 = 0;
    for (; ;) {
        number0 = HTML_main_file_T.search(RE_script);
        if (number0 >= 0) {
            list_cut_out_temp[cut_index] = RE_script.exec(HTML_main_file_T)[0];
            number1 = list_cut_out_temp[cut_index].length;
            text_T = HTML_main_file_T.slice(number2, number0);
            temp0 = chack_in_data_or_exegesis(text_T);
            if (temp0) {
                //temp tag
                HTML_main_file_T = HTML_main_file_T.slice(0, number0) + cut_in_temp + HTML_main_file_T.slice(number1 + number0);
                cut_index++;
            }
            else {
                number2 = number0;
                //console.log('iddddddddddddddddd',RE_script_utl.exec(list_cut_out_temp[cut_index]),list_cut_out_temp,cut_index);
                script_list[link_list_index] = { url: "", use: 0,error_line:[] };
                script_list[link_list_index].url = RE_script_utl.exec(list_cut_out_temp[cut_index]);
                if (script_list[link_list_index].url !== null) {
                    script_list[link_list_index].url = script_list[link_list_index].url[0];
                    script_list[link_list_index].url = RE_script_utl_clean.exec(script_list[link_list_index].url)[0];
                    script_list[link_list_index].url = script_list[link_list_index].url.slice(1, -1);
                }
                else {
                    script_list[link_list_index].url = list_cut_out_temp[cut_index], script_list[link_list_index].use = 3;
                }
                link_list_index++;
                //tag
                HTML_main_file_T = HTML_main_file_T.slice(0, number0) + script_cut_in_code + HTML_main_file_T.slice(number1 + number0);
            }
        }
        else {
            break;
        }
    }
    for (; ;) {
        if (cut_reload_index >= cut_index) break;
        HTML_main_file_T = HTML_main_file_T.replace(cut_in_temp, list_cut_out_temp[cut_reload_index]);
        cut_reload_index++;
    }
    HTML_main_file = HTML_main_file_T;
    return 0;
}
function show_files_list() {
    let home_E = document.getElementById('files_list_box');
    let box_T = [
        '<div id="files_box_list_',
        '" class="files_box_list ',
        '"><div class="files_list_chack">',
        ' <i>wait upload</i></div><label class="files_list_button" for="files_in" onclick="files_list_upload_lable(',
        ')">upload file</label><div class="files_list_button" onclick="files_list_keep_link(',
        ')">keep_link</div></div>'
    ];
    let number0 = 0;
    let text_input = "";
    let Long = link_list.length;
    for (; ;) {
        if (number0 >= Long) {
            break;
        }
        if (link_list[number0].use != 3) {
            text_input = text_input + box_T[0] + 'css_' + number0 + box_T[1] + "list_unload" + box_T[2] + 'type:[<em class="files_type_css">css</em>] url:[' + link_list[number0].url + "]" + box_T[3] + number0 + ',0' + box_T[4] + number0 + ',0' + box_T[5];
        }
        else {
            text_input = text_input + box_T[0] + 'css_' + number0 + box_T[1] + "list_error" + box_T[2] + 'type:[<em class="files_type_css">css</em>] url:[' + link_list[number0].url + "]" + box_T[3] + number0 + ',0' + box_T[4] + number0 + ',0' + box_T[5];
        }
        number0++;
    }
    number0 = 0;
    Long = script_list.length;
    for (; ;) {
        if (number0 >= Long) {
            break;
        }
        if (script_list[number0].use != 3) {
            text_input = text_input + box_T[0] + 'js_' + number0 + box_T[1] + "list_unload" + box_T[2] + 'type:[<em class="files_type_js">JavaScript</em>] url:[' + script_list[number0].url + "]" + box_T[3] + number0 + ',1' + box_T[4] + number0 + ',1' + box_T[5];
        }
        else {
            text_input = text_input + box_T[0] + 'js_' + number0 + box_T[1] + "list_error" + box_T[2] + 'type:[<em class="files_type_js">JavaScript</em>] url:[' + script_list[number0].url + "]" + box_T[3] + number0 + ',1' + box_T[4] + number0 + ',1' + box_T[5];
        }
        number0++;
    }
    home_E.innerHTML = text_input;
    return 0;
}
function files_list_upload_lable(index_in = 0, type = 0){
    files_index=index_in+1,files_type_in=type;
    return 0;
}
function files_list_upload() { 
    let F_E=document.getElementById('files_in');
    let E_M=document.getElementById('output_i');
    let home_E;
    let number0=files_index-1;
    E_M.innerHTML="Loading...";
    if(files_type_in==0){
        console.log('get_file',files_index,'type css');
        home_E=document.getElementById('files_box_list_css_'+number0);
        if(home_E!=null)home_E.getElementsByTagName('i')[0].innerHTML="chacking...";
        get_files(F_E,files_index,false,true);
    }
    else if(files_type_in==1){
        files_index=link_list.length+files_index;
        console.log('get_file',files_index,'type JavaScript');
        home_E=document.getElementById('files_box_list_js_'+number0);
        if(home_E!=null)home_E.getElementsByTagName('i')[0].innerHTML="chacking...";
        get_files(F_E,files_index,false,false);
    }
    return 0;
}
function files_list_keep_link(index_in = 0, type = 0) {
    let home_E;
    let list_array;
    if(type==0){
        home_E=document.getElementById('files_box_list_css_'+index_in);
        list_array=link_list;
    }
    else if(type==1){
        home_E=document.getElementById('files_box_list_js_'+index_in);
        list_array=script_list;
    }
    list_array[index_in].use=2;
    home_E.className="files_box_list list_keep_link";
    files_list_step_style_load();
    return 0;
}
function files_list_step_style_load(){
    let E_M=document.getElementById('output_i');
    let home_E;
    let number0=0,number1=1,number2=2;
    let Long=1,Long1=link_list.length,Long2=script_list.length;
    let color=['#e1ff75','#98e1fd','#04d1f5','#04f518','#ff1b1b'];
    let color_class=['list_unload','list_load','list_keep_link','list_pass','list_error'];
    let type_text=['wait load','wait chack','keep link','pass','error'];
    let style_T=['linear-gradient(90deg',')']
    let text_input="";
    Long=1+Long1+Long2;
    Long=100/Long;
    text_input=style_T[0]+','+color[HTML_main_file_use]+' '+Long+'%';
    for(;;){
        if(number0>=Long1)break;
        home_E=document.getElementById('files_box_list_css_'+number0);
        if(home_E!=null){
            home_E.className="files_box_list "+color_class[link_list[number0].use];
            home_E.getElementsByTagName('i')[0].innerHTML=type_text[link_list[number0].use];
        }
        text_input=text_input+','+color[link_list[number0].use]+' '+number1*Long+'%'+','+color[link_list[number0].use]+' '+number2*Long+'%';
        number0++,number1++,number2++;
    }
    number0=0;
    for(;;){
        if(number0>=Long2)break;
        home_E=document.getElementById('files_box_list_js_'+number0);
        if(home_E!=null){
            home_E.className="files_box_list "+color_class[script_list[number0].use];
            home_E.getElementsByTagName('i')[0].innerHTML=type_text[script_list[number0].use];
        }
        text_input=text_input+','+color[script_list[number0].use]+' '+number1*Long+'%'+','+color[script_list[number0].use]+' '+number2*Long+'%';
        number0++,number1++,number2++;
    }
    text_input=text_input+style_T[1];
    //console.log(text_input);
    E_M.style.background=text_input;
    chack_files_loaded();
    return 0;
}
function chack_files_loaded(){
    console.log('loaded chack');
    let if_error=false;
    let long=link_list.length;
    let number0=0;
    let load=[true,false,false,false,false];
    let error=[false,false,false,false,true];
    if(load[HTML_main_file_use])return 0;
    for(;;){
        if(number0>=long)break;
        if(load[link_list[number0].use])return 0;
        number0++;
    }
    number0=0,long=script_list.length;
    for(;;){
        if(number0>=long)break;
        if(load[script_list[number0].use])return 0;
        number0++;
    }
    // chack error
    if(error[HTML_main_file_use])if_error=true;
    else {
        number0=0,long=link_list.length;
        for(;;){
            if(number0>=long)break;
            if(error[link_list[number0].use]){
                if_error=true;
                break;
            }
            number0++;
        }
        if(!if_error){
            number0=0,long=script_list.length;
            for(;;){
                if(number0>=long)break;
                if(error[script_list[number0].use]){
                    if_error=true;
                    break;
                }
                number0++;
            }
        }
    }
    if(if_error){
        console.log('loaded show error');
        mix_code_error_line();
        show_code_error_lines();
    }
    else{
        console.log('loaded show download');
        show_download();
    }
    return 0;
}
function chack_HTML_line_break_error(){
    let text_T=text_files[0];
    let RE_scritp=/((<)|(\\x3C))script([^>]){0,}>([\s\S]){0,}?((<)|(\\x3C))\/script>/i;
    let RE_script_head=/<[^>]{0,}/i;
    let RE_src=/[\s]src([\s]){0,}=/i;
    let cut_in_text='||----|--|Looking_For_HTML_sCrIpt_cUt_tEmP|-|--||';
    let cut_in_reload_text=cut_in_text+'||---|-srC-TeMp-|--|-|';
    let RE_style=/((<)|(\\x3C))style([^>]){0,}>([\s\S]){0,}?((<)|(\\x3C))\/style>/i;
    let cut_in_text_style='||----|--|Looking_For_HTML_sTyLe_cUt_tEmP|-|--||';
    let cut_text_T="";
    let cut_text_T_script="";
    let cut_text_T_1="";
    let cut_get_text=[];
    let cut_get_lines=[];
    let cut_get_lines_temp=[];
    let script_error_lines=[];
    let script_error_line_index=0;
    let cut_get_text_style=[];
    let cut_get_lines_style=[];
    let style_error_lines=[];
    let style_error_line_index=0;
    let cut_get_index=0;
    let cut_reload_text=[];
    let cut_reload_index=0;
    let number0=0,number1=0,number2=0;
    let if_src=true;
    function src_chack(text_input){
        let text_temp=RE_script_head.exec(text_input)[0];
        text_temp=text_temp.search(RE_src);
        if(text_temp==-1)return false;
        else return true;
    }
    text_T=remove_data_or_exegesis_keep_line(text_T);
    for(;;){
        number0=text_T.search(RE_scritp);
        if(number0==-1)break;
        cut_text_T=RE_scritp.exec(text_T)[0];
        //console.log('js line',cut_text_T);
        number1=cut_text_T.length+number0;
        if_src=src_chack(cut_text_T);
        if(if_src){
            cut_reload_text[cut_reload_index]=cut_text_T;
            text_T=text_T.slice(0,number0)+cut_in_reload_text+text_T.slice(number1);
            cut_reload_index++;
        }
        else{
            cut_get_text[cut_get_index]=cut_text_T;
            text_T=text_T.slice(0,number0)+cut_in_text+text_T.slice(number1);
            cut_get_index++;
        }
    }
    number0=0;
    for(;;){
        if(number0>=cut_reload_index)break;
        text_T=text_T.replace(cut_in_reload_text,cut_reload_text[number0]);
        number0++;
    }
    // chack break error
    // get files start line
    cut_text_T=text_T;
    cut_get_index=0;
    for(;;){
        number0=cut_text_T.search(/\|\|----\|--\|Looking_For_HTML_sCrIpt_cUt_tEmP\|-\|--\|\|/);
        if(number0==-1)break;
        cut_text_T_1=cut_text_T.slice(0,number0);
        cut_text_T_1=cut_text_T_1.split(/\r\n/);
        cut_get_lines[cut_get_index]=cut_text_T_1.length;
        cut_text_T=cut_text_T.replace(/\|\|----\|--\|Looking_For_HTML_sCrIpt_cUt_tEmP\|-\|--\|\|/,cut_get_text[cut_get_index]);
        cut_get_index++;
    }
    cut_text_T_script=cut_text_T;
    // get error line in files and update line in home test
    number0=cut_get_text.length;
    cut_get_index=0;
    for(;;){
        if(cut_get_index>=number0)break;
        cut_get_lines_temp=chack_js_css_line_break_error(cut_get_text[cut_get_index]);
        number1=0;number2=cut_get_lines_temp.length;
        for(;;){
            if(number1>=number2)break;
            script_error_lines[script_error_line_index]=cut_get_lines[cut_get_index]+cut_get_lines_temp[number1]-1;
            number1++,script_error_line_index++;
        }
        cut_get_index++;
    }
    //console.log('js:')
    //console.log('ssl',cut_get_lines);
    //console.log('scl',script_error_lines);

    //chack style code
    text_T=cut_text_T_script;
    cut_get_index=0;
    for(;;){
        number0=text_T.search(RE_style);
        if(number0==-1)break;
        cut_text_T=RE_style.exec(text_T)[0];
        number1=cut_text_T.length+number0;
        cut_get_text_style[cut_get_index]=cut_text_T;
        text_T=text_T.slice(0,number0)+cut_in_text_style+text_T.slice(number1);
        cut_get_index++;
    }
    // chack break error
    // get files start line
    cut_text_T=text_T;
    cut_get_index=0;
    for(;;){
        number0=cut_text_T.search(/\|\|----\|--\|Looking_For_HTML_sTyLe_cUt_tEmP\|-\|--\|\|/);
        if(number0==-1)break;
        cut_text_T_1=cut_text_T.slice(0,number0);
        cut_text_T_1=cut_text_T_1.split(/\r\n/);
        cut_get_lines_style[cut_get_index]=cut_text_T_1.length;
        cut_text_T=cut_text_T.replace(/\|\|----\|--\|Looking_For_HTML_sTyLe_cUt_tEmP\|-\|--\|\|/,cut_get_text_style[cut_get_index]);
        cut_get_index++;
    }
    // get error line in files and update line in home test
    number0=cut_get_text_style.length;
    cut_get_index=0;
    for(;;){
        if(cut_get_index>=number0)break;
        cut_get_lines_temp=chack_js_css_line_break_error(cut_get_text_style[cut_get_index],true);
        number1=0;number2=cut_get_lines_temp.length;
        for(;;){
            if(number1>=number2)break;
            style_error_lines[style_error_line_index]=cut_get_lines_style[cut_get_index]+cut_get_lines_temp[number1]-1;
            number1++,style_error_line_index++;
        }
        cut_get_index++;
    }
    HTML_main_file_error_lines_script=script_error_lines;
    console.log("error line index type:[JavaScript]",HTML_main_file_error_lines_script);
    HTML_main_file_error_lines_style=style_error_lines;
    console.log("error line index type:[css]",HTML_main_file_error_lines_style);
    if(script_error_lines.length>=1){
        if(style_error_lines.length>=1)HTML_main_file_use=4;
        console.log("main HTML file chack error!s");
    }
    else{
        HTML_main_file_use=3;
        console.log("main HTML file chack pass.");
    }
    return 0;
}
/**
 * 
 * @param {*} text_in 
 * @param {false} type_css js
 * @param {true} type_css css
 * @returns 
 */
function chack_js_css_line_break_error(text_in,type_css=false){
    let text_T=text_in;
    let RE_remove_head=/((<)|(\\x3C))script([^>]){0,}>/i;
    let RE_remove_foot=/((<)|(\\x3C))\/script([^>]){0,}>/i;
    let RE_remove_style_head=/((<)|(\\x3C))style([^>]){0,}>/i;
    let RE_remove_style_foot=/((<)|(\\x3C))\/style([^>]){0,}>/i;
    let RE_line_error=/([^;,=\+\-\*\/><\(\)\{\}\s])([\r\n])([\s]){0,}([^;,=\+\-\*\/><\(\)\{\}\s])/i;
    let RE_line_error_1=/([\]])([\r\n])([\s]){0,}([\[])/i;
    let line_error_cut_in="|-|-LFble-10-|-|;";
    let text_temp="";
    let error_array=[];
    let number0=0,number1=0,number2=0;
    if(type_css){
        RE_remove_head=RE_remove_style_head;
        RE_remove_foot=RE_remove_style_foot;
    }
    //console.log('line_B_chack_in',text_T);
    text_T=remove_data_or_exegesis_keep_line(text_T);
    text_temp=RE_remove_head.exec(text_T);
    if(text_temp!==null&&text_temp!==undefined){
        text_temp=text_temp[0].replace(/[^ \r\n]/g,'');
        text_T=text_T.replace(RE_remove_head,text_temp);
    }
    text_T=text_T.replace(RE_remove_foot,'');
    text_T=text_T.replaceAll(line_error_cut_in,'-cut_in_temp-');
    text_T=text_T.replace(/\[/g,'[;');
    text_T=text_T.replace(/\]/g,';]');
    for(;;){
        number0=text_T.search(RE_line_error_1);
        if(number0==-1)break;
        text_temp=RE_line_error.exec(text_T)[0];
        number1=text_temp.length+number0;
        text_temp=text_temp.slice(0,1)+';'+text_temp.slice(1);
        text_T=text_T.slice(0,number0)+text_temp+text_T.slice(number1);
    }
    number0=0,number1=0;
    for(;;){
        number2++;
        if(number2>=20)break;
        number0=text_T.search(RE_line_error);
        if(number0==-1)break;
        text_temp=RE_line_error.exec(text_T)[0];
        number1=text_temp.length+number0-1;
        text_temp=text_temp.replace(/[^\s]/g,'');
        text_T=text_T.slice(0,number0)+line_error_cut_in+text_temp+text_T.slice(number1);
    }
    text_T=text_T.split(/\r\n/);
    number0=0,number2=0;
    number1=text_T.length;
    for(;;){
        if(number0>=number1)break;
        if(text_T[number0].search(/\|-\|-LFble-10-\|-\|;/)!=-1){
            error_array[number2]=number0;
            number2++;
        }
        number0++;
    }
    return error_array;
}
/**
 * name
 * type 0 right
 *      1 error
 *      2 null or ...
 * line 
 * value tests
 */
let files_name_list=["HTML [JavaScript]","HTML [css]"];
let code_error_lines_list=[];
function mix_code_error_line(){
    let line_index=0;
    let text_array=[];
    let long=0,long1=0;
    let number_f=2;
    let number0=0,number1=0,number2=0
    function name_list_maker(){
        let number_0=0,number_1=2;
        let long_0=link_list.length;
        for(;;){
            if(number_0>=long_0)break;
            files_name_list[number_1]=link_list[number_0].url;
            number_0++,number_1++;
        }
        number_0=0;
        long_0=link_list.length;
        for(;;){
            if(number_0>=long_0)break;
            files_name_list[number_1]=script_list[number_0].url;
            number_0++,number_1++;
        }
        return 0;
    }
    function pull_model(name_in,type_in,line_in,value_in){
        let line_model={
            name:name_in,
            type:type_in,
            line:line_in,
            value:value_in
        }
        code_error_lines_list[line_index]=line_model;
        line_index++;
        return 0;
    }
    function error_line_end(name,array_in,text_array_in){
        let number_0=number0-1;
        let end=text_array_in.length;
        number_0=array_in[number_0]+1;
        if(isNaN(number_0))return 0;
        if(array_in[number_0]>=end)return 0;
        pull_model(name,0,number_0+1,text_array_in[number_0]);
        return 0;
    }
    function error_line_mix(name,array_in,text_array_in){
        if(array_in[number0]==0){
            pull_model(name,1,1,text_array_in[0]);
            return 0;
        }
        let number_start=0;
        if(number0==0){
            number_start=array_in[number0];
        }
        else{
            number_start=array_in[number0-1];
        }
        let number_now=array_in[number0];
        if(number_now-number_start>=5){
            pull_model(name,0,number_start+2,text_array_in[number_start+1]);
            pull_model(name,2,'...','');
            pull_model(name,0,number_now,text_array_in[number_now-1]);
            pull_model(name,1,number_now+1,text_array_in[number_now]);
            return 0;
        }
        else{
            if(number0==0){
                pull_model(name,0,number_start,text_array_in[number_start-1]);
                pull_model(name,1,number_start+1,text_array_in[number_start]);
                return 0;
            }
            for(;;){
                number_start++;
                if(number_start>=number_now){
                    pull_model(name,1,number_start+1,text_array_in[number_start]);
                    break;
                }
                pull_model(name,0,number_start+1,text_array_in[number_start]);
            }
            return 0;
        }
    }
    name_list_maker();
    //HTML main file
    text_array=text_files[0];
    text_array=text_array.split(/\r\n/);
    long=HTML_main_file_error_lines_script.length;
    number0=0;
    for(;;){
        if(number0>=long){
            error_line_end(0,HTML_main_file_error_lines_script,text_array);
            break;
        }
        error_line_mix(0,HTML_main_file_error_lines_script,text_array);
        number0++;
    }
    long=HTML_main_file_error_lines_style.length;
    number0=0;
    for(;;){
        if(number0>=long){
            error_line_end(1,HTML_main_file_error_lines_style,text_array);
            break;
        }
        error_line_mix(1,HTML_main_file_error_lines_style,text_array);
        number0++;
    }
    //css files
    long=link_list.length;
    number0=0,number1=1,number2=0;
    for(;;){
        if(number2>=long)break;
        text_array=text_files[number1];
        text_array=text_array.split(/\r\n/);
        long1=link_list[number2].error_line.length;
        for(;;){
            if(number0>=long1){
                error_line_end(number_f,link_list[number2].error_line,text_array);
                break;
            }
            error_line_mix(number_f,link_list[number2].error_line,text_array);
            number0++;
        }
        number1++,number2++,number_f++;
    }
    //js files
    long=script_list.length;
    number0=0,number2=0
    for(;;){
        if(number2>=long)break;
        text_array=text_files[number1];
        text_array=text_array.split(/\r\n/);
        long1=script_list[number2].error_line.length;
        for(;;){
            if(number0>=long1){
                error_line_end(number_f,script_list[number2].error_line,text_array);
                break;
            }
            error_line_mix(number_f,script_list[number2].error_line,text_array);
            number0++;
        }
        number1++,number2++,number_f++;
    }
    console.log('error list is:\n',code_error_lines_list);
    return 0;
}
function show_code_error_lines(){
    let divs_T=['<div class="error_line list_','"><div class="width_160 file_','">','</div><div class="width_40 line">','</div><div class="width_40 error_type">','</div><div class="width_to_right">','</div></div>'];
    let use_type=['pass','error','skip'];
    let list=code_error_lines_list;
    let file_name=files_name_list;
    let file_color=[0,1,2,3];
    let home_E=document.getElementById('error_lines_home_box');
    let home_D=document.getElementById('error_lines_home_box_door');
    let text_input='<div class="error_line error_line_title"><div class="width_160">file name</div><div class="width_40">line</div><div class="width_40">type</div><div class="width_to_right">code</div></div>';
    let long=list.length;
    let number0=0;
    function load_file_color(){
        let long_0=2+link_list.length+script_list.length;
        let number_0=4,number_1=0;
        let file_color_temp=[0,1,2,3];
        for(;;){
            if(number_0>=long_0)break;
            file_color[number_0]=file_color_temp[number_1];
            number_0++;
            number_1=number_0%4;
        }
        return 0;
    }
    load_file_color();
    for(;;){
        if(number0>=long)break;
        text_input=text_input+divs_T[0]+use_type[list[number0].type]+divs_T[1]+file_color[list[number0].name]+divs_T[2]+file_name[list[number0].name]+divs_T[3]+list[number0].line+divs_T[4]+use_type[list[number0].type]+divs_T[5]+list[number0].value+divs_T[6];
        number0++;
    }
    home_E.innerHTML=text_input;
    home_D.style['grid-template-rows']='1fr';
    return 0;
}














/*
0 nomol
1 <any>
2 ""
3 ''
4 //
5 /*...
6 <!-- -->
7 /export/
 */
let type_chacking = 0;
let type_code = [

];
let type_chack_funcation = [
    function (text_in) {
        let text_T = text_in;
        let code_T = text_T[chack_index];
        let number0 = chack_index + 1;
        let temp0 = 0;
        let chack_lable = [
            function (code_in) {
                if (code_in == '(') return 3;
                else if (code_in == '"') return 1;
                else if (code_in == "'") return 2;
                else return 0;
            },
            function (code_in) {
                if (code_in == '"') return 0;
            },
            function (code_in) {
                if (code_in == "'") return 0;
            },
        ]
        if (code_T == '<') {
            if (text_T[number0] == '!') {
                if (text_T[number0 + 1] != '-') return 0
                else if (text_T[number0 + 2] != '-') return 0;
                else return 6;
            }
            else {
                number0 = chack_index - 1;
                for (; ;) {
                    if (number0 < 0) return 0;
                    temp0 = chack_lable[temp0](text_T[number0]);
                    if (temp0 == 3) return 1;
                    else {
                        number0--;
                    }
                }
            }
        }
        else if (code_T == '"') return 2;
        else if (code_T == "'") return 3;
        else if (code_T == '/') {
            if (text_T[number0] == '/') return 4;
            else if (text_T[number0] == '*') return 5;
            else return 7;
        }
        else return 0;
    },
    function (text_in) {
        let code_T = text_in[chack_index];
        if (code_T == '>') return 0;
        else return 1;
    },
    function (text_in) {
        let code_T = text_in[chack_index];
        if (code_T == '"') return 0;
        else return 2;
    },
    function (text_in) {
        let code_T = text_in[chack_index];
        if (code_T == "'") return 0;
        else return 3;
    },
    function (text_in) {
        let code_T = text_in[chack_index];
        if (code_T == '/n') return 0;
        else return 4;
    },
    function (text_in) {
        let text_T = text_in;
        let code_T = text_T[chack_index];
        let number0 = chack_index - 1;
        if (code_T == '/') {
            if (text_T[number0] == '*') return 0;
            else return 5;
        }
        else return 5;
    },
    function (text_in) {
        let text_T = text_in;
        let code_T = text_T[chack_index];
        let number0 = chack_index - 1;
        if (code_T == '>') {
            if (text_T[number0] == '-') {
                if (text_T[number0 - 1] == '-') return 0;
                else return 6;
            }
            else return 6;
        }
        else return 6;
    },
    function (text_in) {
        let code_T = text_in[chack_index];
        if (code_T == '/') return 0;
        else return 7;
    }
];
function text_maker(text_in) {
    let text_T = "";
}
function text_copy(text_in) {
    let text_T = "";
}
function text_chack_log(text_in) {
    let text_T = "";
}
function text_chack(text_in) {
    let text_T;
    let Long = text_in.length;
    let type_chacking_old = 0;
    let type_chack_value_0 = [true, true, true, true, true, true, true, true];
    for (; ;) {
        if (line >= Long) {
            return 0;
        }
        type_chacking = type_chack_funcation[type_chacking](text_in[chack_line]);
        if (type_chack_value_0[type_chacking_old]) {
            if (type_chack_value_0[type_chacking]) { }
        }
        line++;
    }
}



let if_error = false;
/*
line end or next line head
 */
let line_break_legal_0 = [';', ',', '{', '}', '(', ')'];
/*
line end and next line head
 */
let line_break_legal_1 = [
    {
        end: '\[',
        next: ['\[', '\]']
    },
    {
        end: '\]',
        next: ['\[', '\]']
    }
];
let line_break_mix_error = [];
function chack_scritp(text_in, file_in_name, start_line = 0, end_line = text_in.length) {
    function be_RE_0() {
        let index = 0;
        let text_temp = "";
        for (; ;) {
            if (line_break_legal_0[index] === undefined) break;
            text_temp = text_temp + line_break_legal_0[index];
            index++;
        }
        text_temp = new RegExp('[' + text_temp + ']');
        return text_temp;
    }
    function be_RE_1() {
        let index = 0;
        let index_n = 0;
        let text_temp = "";
        let RE_return = [];
        for (; ;) {
            if (line_break_legal_1[index_n] === undefined) break;
            index = 0;
            for (; ;) {
                if (line_break_legal_1[index_n][index] === undefined) break;
                text_temp = text_temp + line_break_legal_1[index_n][index];
                index++;
            }
            RE_return[index_n] = { end: new RegExp('[' + line_break_legal_1[index_n].end + ']'), next: new RegExp('[' + text_temp + ']') }
            index_n++;
        }
        return RE_return;
    }
    let RE_legal_0 = be_RE_0();
    let RE_legal_1 = be_RE_1();
    function error_load(line_in) {
        let error_model = {
            file_name: file_in_name,
            before_line: {
                index: 0,
                value: ""
            },
            error_line: {
                index: 0,
                value: ""
            },
            after_line: {
                index: 0,
                value: ""
            }
        };
        let line_set = line_in - 1;
        if_error = true;
        error_model.before_line.index = line_set;
        error_model.before_line.value = text_in[line_set];
        line_set++;
        error_model.error_line.index = line_set;
        error_model.error_line.value = text_in[line_set];
        line_set++;
        if (text_in[line_set] === undefined) {
            error_model.after_line.index = 'end';
            error_model.after_line.value = undefined;
        }
        else {
            error_model.after_line.index = line_set;
            error_model.after_line.value = text_in[line_set];
        }
        line_set = line_break_mix_error.length;
        line_break_mix_error[line_set] = error_model;
    }
    function line_chack() {
        let line_n = 0;
        let line_l = text_in[number0].length - 1;
        let text_temp = text_in[number0][line_l];
        let ruler_index = 0;
        for (; ;) {
            if (text_temp === undefined) {
                return 0;
            }
            else if (text_temp == ' ') {
                line_l--;
                text_temp = text_in[line_n][line_l];
            }
            else break;
        }
        if (RE_legal_0.test(text_temp)) return 0;
        else {
            for (; ;) {
                if (RE_legal_1[ruler_index] === undefined) break;
                if (RE_legal_1[ruler_index].end.test(text_temp)) {
                    line_n = number0 + 1;
                    line_l = 0;
                    text_temp = text_in[line_n][0];
                    for (; ;) {
                        if (text_temp === undefined) {
                            line_n++;
                            line_l = 0;
                            text_temp = text_in[line_n][line_l];
                        }
                        else if (text_temp == ' ') {
                            line_l++;
                            text_temp = text_in[line_n][line_l];
                        }
                        else break;
                    }
                }
                if (RE_legal_1[ruler_index].next.test(text_temp)) {
                    return 0;
                }
                else break;
            }
            error_load(number0);
        }
        return 1;
    }
    let number0 = start_line;
    for (; ;) {
        if (number0 > end_line) break;
        line_chack();
        number0++;
    }
}
function line_break_mix_error_chack(text_in, file_in_name) {
    let Long = text_in.length;
    let number0 = 0, number1 = 0;
    let scritp_start = [];
    let scritp_end = [];
    function find_scritp() {
        let RE_start = /<script /i;
        let RE_end = /<\/script /i;
        let RE_data = /['"]/;
        let text_temp = "";
        chack_line = 0;
        for (; ;) {
            if (chack_line >= Long) break;
            if (RE_start.test(text_in[chack_line])) {
                text_temp = text_in[chack_line].split(/<script /i);
                text_temp = text_temp[0].replace(/"[^"]"/g, '');
                text_temp = text_temp.replace(/'[^']'/g, '');
                if (!RE_data.test(text_temp)) scritp_start[number0] = chack_line;
            }
            if (RE_end.test(text_in[chack_line])) {
                text_temp = text_in[chack_line].split(/<script /i);
                text_temp = text_temp[0].replace(/"[^"]"/g, '');
                text_temp = text_temp.replace(/'[^']'/g, '');
                if (!RE_data.test(text_temp))
                    scritp_end[number0] = chack_line;
            }
            chack_line++, number0++;
        }
    }
    find_scritp();
    number0 = 0;
    number1 = scritp_start.length;
    for (; ;) {
        if (number0 >= number1) break;
        chack_scritp(text_in, file_in_name, scritp_start[number0], scritp_end[number0]);
        number0++;
    }
    return 0;
}

function get_link_file() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://homeself.buesand.com/js/version.js");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.send();
}

function get_link_text() {
    fetch("file.txt")
        .then(response => response.text())
        .then(content => {
            console.log(content);
        });
}




















let show_code_value = false;
function get_file() {
    let F_E = document.getElementById('file_in');
    let F_I_E = document.getElementById('output_i');
    F_I_E.innerHTML = 'Loading';
    let F_T;
    let F_R;
    if (F_E.files[0]) {
        F_R = new FileReader();
        F_R.readAsText(F_E.files[0], 'utf-8');
        F_R.onload = function () {
            F_I_E.className = 'output_i output_i_s';
            F_I_E.innerHTML = 'Loaded';
            F_T = this.result;
            chack_text(F_T);
        }
    }
    else {
        F_I_E.className = 'output_i output_i_f';
        F_I_E.innerHTML = 'Load fall';
    }
}
function remove_ex_spase(text) {
    let T_T = text;
    T_T = T_T.replace(/[ ]{2,}/g, ' ');
    return T_T;
}
function remove_ex_enter(text) {
    let T_T = text;
    T_T = T_T.replace(/[\r\n]/g, '');
    return T_T;
}
function remove_annotation(file) {
    const code_s = [
        ['"', "'", '/' + '/', '/*', '<!--'],
        ['"', "'", '\n', '*/', '-->']
    ];
    let F_T = file;
    let number0 = 0;
    let F_R = '';
    let R_T = [F_R, true];
    let aero_in = false;
    let aero_temp = [false, ''];
    let line_n = 1;
    let R_E = [/[;{}\n\r> \/,\[]/, /\][ \r\n\]]{0,}[;,]/, /[ \r\n\];,]/, /[ \r\n]/];
    let number1 = 0, number2 = 0;
    let error_where = [undefined];
    let T_T = '\n&ensp;&ensp;&ensp;&ensp;Enter error !\n\n';
    let temp_chack = '', temp_chack1 = false;
    let number3 = 0, number4 = 0;
    let temp_line_v = '';
    //F_T=remove_ex_spase(F_T);
    for (; ;) {
        /*if(F_T[3+number0]==undefined){
            if(F_T[2+number0]==undefined){
                if(F_T[1+number0]==undefined){
                    if(F_T[number0]==undefined){
                        break;
                    }
                }
            }
        }*/
        if (F_T[number0] == undefined) {
            if (aero_temp[0] === false || aero_temp[0] == 0 || aero_temp[0] == 1) {
                F_R = F_R + aero_temp[1];
            }
            break;
        }
        if (aero_in !== false) {
            aero_temp[1] = aero_temp[1] + F_T[number0];
            if (aero_in == 0) {
                if (F_T[number0] == code_s[1][0]) {
                    aero_in = false;
                }
            }
            else if (aero_in == 1) {
                if (F_T[number0] == code_s[1][1]) {
                    aero_in = false;
                }
            }
            else if (aero_in == 2) {
                if (F_T[number0] == code_s[1][2]) {
                    aero_in = false;
                }
            }
            else if (aero_in == 3) {
                if (F_T[number0] + F_T[1 + number0] == code_s[1][3]) {
                    aero_in = false;
                    number0++;
                    aero_temp[1] = aero_temp[1] + F_T[number0];
                }
            }
            else if (aero_in == 4) {
                if (F_T[number0] + F_T[1 + number0] + F_T[2 + number0] == code_s[1][4]) {
                    aero_in = false;
                    number0++;
                    aero_temp[1] = aero_temp[1] + F_T[number0];
                    number0++;
                    aero_temp[1] = aero_temp[1] + F_T[number0];
                }
            }
        }
        else {
            if (F_T[number0] == code_s[0][0]) {
                aero_in = 0;
            }
            else if (F_T[number0] == code_s[0][1]) {
                aero_in = 1;
            }
            else if (F_T[number0] == '/') {
                if (F_T[number0] + F_T[1 + number0] == code_s[0][2]) {
                    aero_in = 2;
                }
                else if (F_T[number0] + F_T[1 + number0] == code_s[0][3]) {
                    aero_in = 3;
                }
            }
            else if (F_T[number0] == '<') {
                if (F_T[number0] + F_T[1 + number0] + F_T[2 + number0] + F_T[3 + number0] === code_s[0][4]) {
                    aero_in = 4;
                }
            }
            if (aero_in === false) {
                aero_temp[1] = aero_temp[1] + F_T[number0];
            }
        }
        if (aero_temp[0] !== aero_in) {
            if (aero_temp[0] === false || aero_temp[0] == 0 || aero_temp[0] == 1) {
                F_R = F_R + aero_temp[1];
            }
            if (aero_in === false) {
                aero_temp[1] = '';
            }
            else {
                aero_temp[1] = '' + F_T[number0];
            }
            aero_temp[0] = aero_in;
        }
        temp_line_v = temp_line_v + F_T[number0];
        if (F_T[number0] == '\r') {
            line_n++;
            temp_line_v = temp_line_v.replace(/[\r\n]/g, '');
            if (aero_temp[0] === false || aero_temp[0] == 0 || aero_temp[0] == 1) {
                number4 = number0 + 1;
                temp_chack1 = false;
                for (; ;) {
                    if (R_E[3].test(F_T[number4])) { }
                    else {
                        if (F_T[number4] == '}') temp_chack1 = true;
                        break;
                    }
                    number4++;
                }
                if (temp_chack1) { }
                else if (F_T[number0 - 1] === ']') {
                    temp_chack = F_T[number0 - 1];
                    number3 = number0;
                    for (; ;) {
                        if (R_E[2].test(F_T[number3])) temp_chack = temp_chack + F_T[number3];
                        else break;
                        number3++;
                    }
                    number3 = 1;
                }
                else {
                    temp_chack = F_T[number0 - 1];
                    number3 = 0;
                }
                if (temp_chack1 || R_E[number3].test(temp_chack) || temp_chack === undefined) { }
                else {
                    error_where[number2] = line_n;
                    number2++;
                    error_where[number2] = temp_line_v + '\r\n';
                    number2++;
                }
            }
            temp_line_v = '&ensp;&ensp;&ensp;&ensp;';
        }
        number0++;
    }
    if (error_where[0] === undefined) {
        R_T[0] = F_R;
    }
    else {
        number0 = 0;
        for (; ;) {
            if (error_where[number0] === undefined) break;
            T_T = T_T + 'Enter error at line ' + error_where[number0] + ':\n' + error_where[number0 + 1] + '\n';
            number0++;
            number0++;
        }
        R_T[0] = T_T, R_T[1] = false;
    }
    return R_T;
}
function change_60(text) {
    let temp_T = text;
    temp_T = temp_T.replace(/</g, '&#60;');
    temp_T = temp_T.replace(/>/g, '&#62;');
    temp_T = temp_T.replace(/\n/g, '<br>');
    return temp_T;
}
function chang_dev_def_language_of_save_file(text) {
    let temp_T = text;
    temp_T = temp_T.replace(/Looking_For_S_Save_File[(][)]/, 'Looking_For_S_Save_File(true)');
    return temp_T;
}
function change_LF_code(text) {
    let temp_T = text;
    temp_T = temp_T.replace(/</g, 'LF60b;');
    temp_T = temp_T.replace(/>/g, 'LF62b;');
    temp_T = temp_T.replace(/"/g, 'LF34b;');
    return temp_T;
}
function split_part(text) {
    let T_T = text;
    let T_P = ['', ''];
    let temp0 = '';
    const conf_temp = 'Looking_For_Background_If_Use=[\r\n[\r\n[-2, "0", 0, 0, 0, 0]\r\n],\r\n[\r\n[-2, "0", 0, 0, 0, 0]\r\n]\r\n];\r\n' + '/*links 是网页链接，可自行修改，注意保持格式\r\n类型编号从 1 开始 其为 0 时，列表结束\r\n分别是 类型编号 类型/链接名称 链接主页 链接(如为类型，则为0) 链接后部控制符(0为无控制) 链接打开方式,数值参见ctrl_go_link_as 非默认打开方式的原因(0为默认原因) 是否启用\r\n以下网页链接仅供测试使用*/\r\nvar Looking_For_Links=[\r\n[0,"",0,0,0,ctrl_go_link_as,0,1],\r\n[-1,0,0,0,0,ctrl_go_link_as,0,1],\r\n];\r\n';
    T_T = T_T.split('/*CONFIG END*/');
    if (T_T[1] === undefined) {
        return undefined;
    }
    T_P[0] = T_T[0] + '\r\n/*CONFIG END*/\r\n';
    T_P[1] = T_T[1];
    T_T = T_P[0].split('Looking_For_Background_If_Use=[')[0];
    T_P[0] = T_T + conf_temp;
    T_T = T_P[1].split('<input placeholder="I" id="Looking_For_S_Save_Body" value="');
    if (T_T[1] === undefined) {
        return undefined;
    }
    T_P[1] = T_T[0] + '<input placeholder="I" id="Looking_For_S_Save_Body" value="';
    T_P[2] = T_T[1];
    T_T = T_P[0].split('Version:');
    if (T_T[1] === undefined) {
        return undefined;
    }
    T_P[3] = T_T[1].split(/['"']/)[1];
    return T_P;
}
function chack_text(file) {
    let F_E = document.getElementById('file_in');
    let F_I_E = document.getElementById('output_i');
    let fine = true;
    let temp_text = file;
    let temp_text_show = '';
    let temp_part_e = '';
    let V_F = '';
    let temp_part = split_part(temp_text);
    if (temp_part === undefined) {
        F_I_E.className = 'output_i output_i_f';
        F_I_E.innerHTML = 'Split error';
        return -1;
    }
    V_F = temp_part[3];
    temp_text = remove_annotation(temp_text);
    if (temp_text[1]) {
        temp_text = remove_annotation(temp_part[1]);
        temp_part[1] = temp_text[0];
        temp_part_e = remove_ex_enter(temp_part[1]);
        temp_part_e = remove_ex_spase(temp_part_e);
        temp_part_e = change_LF_code(temp_part_e);
        temp_text = remove_annotation(temp_part[2]);
        temp_part[2] = temp_text[0];
        //save change of moll language show at first open in release
        temp_part[1] = chang_dev_def_language_of_save_file(temp_part[1]);
        //
        temp_text = temp_part[0] + temp_part[1] + '/*CONFIG END*/' + temp_part_e + temp_part[2];
    }
    else {
        fine = false;
        temp_text_show = temp_text[0];
    }
    if (fine) {
        temp_text_show = change_60(temp_text);

        show_text(temp_text_show);
        show_code(V_F);
        show_download(V_F, temp_text);
    }
    else {
        temp_text_show = change_60(temp_text_show);
        show_text(temp_text_show);
        document.getElementById('output_div').style['grid-template-rows'] = '1fr';
        F_I_E.className = 'output_i output_i_f';
        F_I_E.innerHTML = 'Chack not pass';
    }
}
function show_text(file) {
    let temp_F = file;
    let P_E = document.getElementById('output_p');
    P_E.innerHTML = temp_F;
    return 0;
}
function show_code(lv) {
    let F_I_E = document.getElementById('output_i');
    let B_E = document.getElementById('show_code');
    let B_V_E = document.getElementById('show_version');
    F_I_E.innerHTML = 'Pass';
    B_V_E.innerHTML = 'Looking_For_V_' + lv + '_DEV.html';
    B_E.style.height = '40px';
    B_V_E.style.height = '40px';
}
function show_code_a() {
    let B_E = document.getElementById('output_div');
    if (show_code_value) {
        B_E.style['grid-template-rows'] = '0fr';
    }
    else {
        B_E.style['grid-template-rows'] = '1fr';
    }
    show_code_value = !show_code_value;
}
function show_download(lv, file) {
    let D_E = document.getElementById('download_div');
    let A_E = document.getElementById('download_a');
    const url = window.URL || window.webkitURL || window;
    const blob = new Blob([file]);
    A_E.download = 'Looking_For_V_' + lv + '_DEV.html';
    A_E.href = url.createObjectURL(blob);
    D_E.style.height = '100px';
}
function file_download() {
    let A_E = document.getElementById('download_a');
    A_E.click();
}
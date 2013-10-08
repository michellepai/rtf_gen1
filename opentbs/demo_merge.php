<?php

if (isset($_GET['source']))
    exit('<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>OpenTBS plug-in for TinyButStrong - demo source</title></head><body>' . highlight_file(__FILE__, true) . '</body></html>');
//docx
if (isset($_POST['download_method']) && $_POST['download_method'] == 'docx') {
    if (!isset($_POST['btn_go']))
        exit("You must use <a href='demo.html'>demo.html</a>");
    $template = (isset($_POST['tpl'])) ? $_POST['tpl'] : '';
    $template = basename($template); // for security
    $info = pathinfo($template);

    if (substr($template, 0, 5) !== 'demo_')
        exit("Wrong file.");
    if (!file_exists($template))
        exit("The asked template does not exist.");

    $script = $info['filename'] . '.php';
    include($script);
}

//cvs
if (isset($_POST['download_method']) && $_POST['download_method'] == 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=api_spec.csv');
    foreach ($_POST as $p) {
        echo $p . ',';
    }
}

if (isset($_POST['download_method']) && $_POST['download_method'] == 'json') {
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Disposition: attachment; filename=api_spec.txt');
    echo json_encode($_POST);
}
?>

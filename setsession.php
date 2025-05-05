<?php
// 在顶部添加UUID生成函数
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

session_start();

// 检查是否已有有效的 session_id，如果没有则生成新的
if (!isset($_SESSION['session_id'])) {
    $_SESSION['session_id'] = generateUUID();
}

// 如果访客 ID 没有，生成新的 visitor_biz_id
if (!isset($_SESSION['visitor_biz_id'])) {
    $_SESSION['visitor_biz_id'] = generateUUID();
}

// 获取模型类型
$model_type = trim($_POST['model_type']);
$bot_app_key = "kCikSvOP";  // 可以根据实际情况返回不同的 bot_app_key

// 返回 session_id 和 visitor_biz_id
echo json_encode([
    'success' => true,
    'session_id' => $_SESSION['session_id'],
    'visitor_biz_id' => $_SESSION['visitor_biz_id'],
    'bot_app_key' => $bot_app_key
]);
exit;
?>

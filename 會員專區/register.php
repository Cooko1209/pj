<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 設置資料庫連接參數
    $servername = "127.0.0.1";
    $username = "root"; // 根據你的設置
    $password = "1qaz@wsx"; // 根據你的設置
    $dbname = "membership_db";

    // 創建連接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 檢查連接
    if ($conn->connect_error) {
        die("連接失敗: " . $conn->connect_error);
    }

    // 獲取表單數據
    $user = $_POST['username'];
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT); // 加密密碼
    $email = $_POST['email'];

    // 準備及綁定
    $stmt = $conn->prepare("INSERT INTO members (username, password, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user, $pass, $email);

    // 執行
    if ($stmt->execute()) {
        echo "註冊成功";
    } else {
        echo "錯誤: " . $stmt->error;
    }

    // 關閉連接
    $stmt->close();
    $conn->close();
} else {
    echo "請求方法不被允許";
}

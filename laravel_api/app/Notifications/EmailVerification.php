<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class EmailVerification extends Notification
{
    use Queueable;

    public function __construct()
    {
        //
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Verifikasi Email')
            ->line('Selamat datang di aplikasi Perpustakaan Digital !')
            ->line('Klik tombol di bawah ini untuk memverifikasi alamat email Anda.')
            ->action('Verifikasi Email', $this->verificationUrl($notifiable))
            ->line('Jika Anda tidak membuat permintaan ini, Anda dapat mengabaikan pesan ini.')
            ->line('Jangan ragu untuk mengikuti kami di Instagram dan GitHub:')
            ->line('Instagram: https://www.instagram.com/xterjey/')
            ->line('GitHub: https://github.com/xterjey');
    }
    
    
    
    protected function verificationUrl($notifiable)
    {
        return route('verification.verify', $notifiable->verification_token);
    }

    public function toArray($notifiable)
    {
        return [];
    }
}

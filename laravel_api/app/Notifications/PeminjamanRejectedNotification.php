<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Peminjaman;

class PeminjamanRejectedNotification extends Notification
{
    use Queueable;

    protected $peminjaman;

    public function __construct(Peminjaman $peminjaman)
    {
        $this->peminjaman = $peminjaman;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Peminjaman Rejected')
                    ->line('Peminjaman Anda telah ditolak.')
                    ->line('Detail Peminjaman:')
                    ->line('Tanggal Peminjaman: ' . $this->peminjaman->TanggalPeminjaman)
                    ->line('Status: ' . $this->peminjaman->StatusPeminjaman)
                    ->action('Lihat Detail Peminjaman', url('https://jayourbae.biz.id/'))
                    ->line('Terima kasih atas penggunaan layanan kami.');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

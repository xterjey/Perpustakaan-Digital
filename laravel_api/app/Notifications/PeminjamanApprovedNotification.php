<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Peminjaman;

class PeminjamanApprovedNotification extends Notification
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
                    ->subject('Peminjaman Approved')
                    ->line('Peminjaman Anda telah disetujui.')
                    ->line('Detail Peminjaman:')
                    ->line('Tanggal Peminjaman: ' . $this->peminjaman->TanggalPeminjaman)
                    ->line('Tanggal Pengembalian: ' . $this->peminjaman->TanggalPengembalian)
                    ->line('Status: ' . $this->peminjaman->StatusPeminjaman)
                    ->action('Lihat Detail Peminjaman', url('https://jayourbae.biz.id/home/pinjaman/'))
                    ->line('Makasih Ye!! Siapa Imam Mahdi?')
                    ->line('--------------------------')
                    ->line('Follow Aing:')
                    ->line('Instagram: https://instagram.com/xterjey')
                    ->line('GitHub: https://github.com/xterjey')
                    ->line('--------------------------');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

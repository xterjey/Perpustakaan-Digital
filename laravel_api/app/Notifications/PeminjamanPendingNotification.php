<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Peminjaman;

class PeminjamanPendingNotification extends Notification
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
                    ->subject('Peminjaman Pending')
                    ->line('Peminjaman Anda sedang menunggu persetujuan.')
                    ->line('Detail Peminjaman:')
                    ->line('Tanggal Peminjaman: ' . $this->peminjaman->TanggalPeminjaman)
                    ->line('Tanggal Pengembalian: ' . $this->peminjaman->TanggalPengembalian)
                    ->line('Status: ' . $this->peminjaman->StatusPeminjaman)
                    ->action('Lihat Detail Peminjaman', url('https://jayourbae.biz.id/home/pinjaman/' . $this->peminjaman->id))
                    ->line('Terima kasih telah menggunakan layanan kami!');
    }

    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

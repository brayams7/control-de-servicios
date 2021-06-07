# Generated by Django 2.2.13 on 2021-06-04 20:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210604_0716'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detalle_venta',
            name='compra',
        ),
        migrations.AddField(
            model_name='detalle_venta',
            name='venta',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='detalle_venta_venta', to='api.Venta'),
        ),
        migrations.AlterField(
            model_name='detalle_compra',
            name='compra',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalle_compra_compra', to='api.Compra'),
        ),
        migrations.AlterField(
            model_name='detalle_compra',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalle_compra_producto', to='api.Producto'),
        ),
        migrations.AlterField(
            model_name='detalle_venta',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='detalle_venta_producto', to='api.Producto'),
        ),
        migrations.AlterField(
            model_name='existencia',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='existencia_producto', to='api.Producto'),
        ),
    ]
